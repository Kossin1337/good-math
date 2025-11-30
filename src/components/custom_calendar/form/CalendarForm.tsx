import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../utils/firebase";

import "./CalendarForm.scss";

const schoolOptions = ["Szkola Podstawowa", "Liceum", "Technikum", "Studia I"] as const;

const ContactSchema = z.object({
  fullName: z.string().min(2, "Wprowadź pełne imię i nazwisko"),
  email: z.string().email("Nieprawidłowy adres email"),
  phone: z
    .string()
    .refine((val) => !val || /^[0-9+\s()-]+$/.test(val), "Nieprawidłowy numer telefonu"),
  school: z.enum(schoolOptions),
  classSemester: z.string().min(1, "Wybierz klasę lub semestr"),
  where: z.enum(["online", "onsite"]),
  additionalInfo: z.string().max(1000, "Maksymalnie 1000 znaków").optional(),
});

type ContactFormData = z.infer<typeof ContactSchema>;

interface ICalendarForm {
  selectedSlots: MeetingSlot[];
  setStep: React.Dispatch<React.SetStateAction<1 | 2>>;
}

type MeetingSlot = {
  id: string; // unique id
  dateISO: string; // yyyy-mm-dd (local)
  weekday: string; // localized weekday (pl-PL)
  startHour: number; // 9..17
  startMinute: number; // 0|30
  durationMinutes: number; // 60|90|120...
};

const CalendarForm: React.FC<ICalendarForm> = ({ selectedSlots, setStep }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  useEffect(() => {
    if (!alertMessage) return;
    const id = setTimeout(() => setAlertMessage(null), 3000); // hide after 4s
    return () => clearTimeout(id);
  }, [alertMessage]);

  const submitData = async (data: ContactFormData) => {
    console.log("Wybrane sloty:", selectedSlots);
    console.log("Dane kontaktowe:", data);
    if (!selectedSlots.length) {
      setAlertMessage("Wybierz przynajmniej jeden termin przed wysłaniem.");
      return;
    }

    console.log("Wybrane sloty:", selectedSlots);
    console.log("Dane kontaktowe:", data);

    try {
      await addDoc(collection(db, "meetings"), {
        info: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          school: data.school,
          classSemester: data.classSemester,
          additionalInfo: data.additionalInfo ?? null,
        },
        where: data.where, // "online" | "onsite"
        // one document, many slots
        slots: selectedSlots.map((slot) => ({
          id: slot.id,
          weekday: slot.weekday,
          startTime: `${slot.dateISO} / ${String(slot.startHour).padStart(2, "0")}:${String(
            slot.startMinute
          ).padStart(2, "0")}:00`,
          durationMinutes: slot.durationMinutes,
        })),
        createdAt: serverTimestamp(),
      });

      setAlertMessage("Zgłoszenie wysłane ✅");
      // e.g. go back to first step or success step
      setStep(1);
    } catch (error) {
      console.error("❌ Error saving meeting request:", error);
      setAlertMessage("Wystąpił błąd podczas wysyłania zgłoszenia. Spróbuj ponownie później.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(submitData)}>
      <h2 className="sub-heading">Wprowadź dane kontaktowe</h2>

      <input {...register("fullName")} placeholder="Imię i nazwisko" />
      {errors.fullName && <p className="error">{errors.fullName.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            className="form-input"
            onChange={(e) => {
              let value = e.target.value;

              // Always keep the leading "+"
              if (!value.startsWith("+")) {
                value = "+" + value.replace(/[^0-9\s]/g, "");
              }

              // Keep only digits and spaces after "+"
              value = "+" + value.slice(1).replace(/[^\d\s]/g, "");

              // Extract up to 2 digits for the country code after "+"
              const prefixMatch = value.match(/^\+(\d{0,2})/);
              const prefixDigits = prefixMatch ? prefixMatch[1] : "";
              const prefix = "+" + prefixDigits;

              // Get the rest (after prefix)
              let rest = value.slice(prefix.length).replace(/\s+/g, "").replace(/\D/g, "");

              // Format rest into groups of 3 digits (e.g. 123 456 789)
              rest = rest.replace(/(\d{3})(?=\d)/g, "$1 ");

              // Recombine prefix + rest (with a space if rest exists)
              let formatted = prefix + (rest ? " " + rest.trim() : "");

              // Prevent deleting "+" by ensuring field always starts with "+"
              if (!formatted.startsWith("+")) {
                formatted = "+" + formatted;
              }

              field.onChange(formatted);
            }}
            onKeyDown={(e) => {
              // Prevent deleting the "+"
              if (
                (e.key === "Backspace" || e.key === "Delete") &&
                e.currentTarget.selectionStart === 0
              ) {
                e.preventDefault();
              }
            }}
            value={field.value ?? "+48 "}
            maxLength={15}
            placeholder="+48 123 456 789"
          />
        )}
      />
      {/* <input {...register("phone")} placeholder="Telefon (opcjonalnie)" />
      {errors.phone && <p className="error">{errors.phone.message}</p>} */}

      <select {...register("school")}>
        <option value="">Wybierz szkołę</option>
        {schoolOptions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <input
        {...register("classSemester")}
        placeholder="Klasa / semestr"
        type="number"
        min="1"
        max="9"
      />
      {errors.classSemester && <p className="error">{errors.classSemester.message}</p>}

      <div className="where-options">
        <label className="where-option">
          <input type="radio" value="online" {...register("where")} />
          <span>Online</span>
        </label>
        <label className="where-option">
          <input type="radio" value="onsite" {...register("where")} />
          <span>Na miejscu</span>
        </label>
      </div>

      <textarea {...register("additionalInfo")} placeholder="Dodatkowe informacje..." rows={4} />

      <div className="form-actions">
        <button type="button" onClick={() => setStep(1)}>
          ← Wróć
        </button>
        <button type="submit">Wyślij</button>
      </div>
    </form>
  );
};

export default CalendarForm;
