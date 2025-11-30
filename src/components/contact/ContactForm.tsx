import { useState, useEffect } from "react";
import Alert from "../alert/Alert";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { formFieldsReview } from "../../animations/motionPresets";
import { motion } from "framer-motion";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebase"; // adjust path if needed

import "./ContactForm.scss";

const schoolOptions = ["Szkola Podstawowa", "Liceum", "Technikum", "Studia I"] as const;

// ✅ Validation rules for each school type
const classRangeBySchool: Record<(typeof schoolOptions)[number], [number, number]> = {
  "Szkola Podstawowa": [6, 8],
  Liceum: [1, 4],
  Technikum: [1, 5],
  "Studia I": [1, 8],
};

// ✅ Zod schema with conditional class validation
const ContactSchema = z
  .object({
    fullName: z.string().min(2, "Wprowadź pełne imię i nazwisko"),
    email: z.string().email("Nieprawidłowy adres email"),
    phone: z
      .string()
      .refine((val) => !val || /^[0-9+\s()-]+$/.test(val), "Nieprawidłowy numer telefonu"),
    school: z.enum(schoolOptions),
    classSemester: z.string().min(1, "Wybierz klasę lub semestr"),
    additionalInfo: z.string().max(1000, "Maksymalnie 1000 znaków").optional(),
  })
  .refine(
    (data) => {
      const [min, max] = classRangeBySchool[data.school];
      const num = Number(data.classSemester);
      return num >= min && num <= max;
    },
    {
      message: "Nieprawidłowy numer klasy lub semestru dla wybranej szkoły",
      path: ["classSemester"],
    }
  );

type ContactFormData = z.infer<typeof ContactSchema>;
const ContactForm = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      phone: "+48 ",
    },
  });

  useEffect(() => {
    if (!alertMessage) return;
    const id = setTimeout(() => setAlertMessage(null), 3000); // hide after 4s
    return () => clearTimeout(id);
  }, [alertMessage]);

  const selectedSchool = watch("school");

  const clearForm = () => {
    console.log("clearForm activated");
    reset({
      fullName: "",
      email: "",
      phone: "+48 ",
      // school is intentionally omitted → goes back to empty selection
      classSemester: "",
      additionalInfo: "",
    });
  };

  const submitData = async (data: ContactFormData) => {
    try {
      console.log("addDoc activated");
      await addDoc(collection(db, "contact"), {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        school: data.school,
        classSemester: data.classSemester,
        additionalInfo: data.additionalInfo ?? null,
        createdAt: serverTimestamp(),
      });

      setAlertMessage("Formularz został wysłany pomyślnie!");
      clearForm();
    } catch (error) {
      console.error("❌ Error saving contact form:", error);
      setAlertMessage("Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie później.");
    }
  };

  // Determine numeric range dynamically
  const [min, max] = selectedSchool ? classRangeBySchool[selectedSchool] : [1, 1];

  return (
    // <form onSubmit={handleSubmit(submitData)} className="contact-form">
    <>
      {alertMessage && Alert(alertMessage, "green")}

      <form onSubmit={handleSubmit(submitData)} className="contact-form">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={formFieldsReview(1)}
          viewport={{ once: true, amount: 0.25 }}
          className="field-group"
        >
          <label className="form-label">Imię i Nazwisko</label>
          <input {...register("fullName")} className="form-input" />
          {errors.fullName && <p className="error">{errors.fullName.message}</p>}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={formFieldsReview(2)}
          viewport={{ once: true, amount: 0.25 }}
          className="field-group"
        >
          <label className="form-label">Telefon</label>
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

          {errors.phone && <p className="error">{errors.phone.message}</p>}
          {/* <input {...register("phone")} className="form-input" />
        {errors.phone && <p className="error">{errors.phone.message}</p>} */}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={formFieldsReview(3)}
          viewport={{ once: true, amount: 0.25 }}
          className="field-group"
        >
          <label className="form-label">Email</label>
          <input {...register("email")} className="form-input" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={formFieldsReview(4)}
          viewport={{ once: true, amount: 0.25 }}
          className="field-group"
        >
          <label className="form-label">Poziom</label>
          <select {...register("school")} className="form-input form-select">
            <option value="">-- wybierz --</option>
            {schoolOptions.map((option) => (
              <option className="form-option" key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.school && <p className="error">{errors.school.message}</p>}
        </motion.div>

        {selectedSchool && (
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={formFieldsReview(0, 0.05)}
            viewport={{ once: true, amount: 0.25 }}
            className="field-group"
          >
            {selectedSchool === "Studia I" ? (
              <label className="form-label">
                Semestr ({min}–{max})
              </label>
            ) : (
              <label className="form-label">
                Klasa ({min}–{max})
              </label>
            )}
            <input
              type="number"
              min={min}
              max={max}
              {...register("classSemester")}
              className="form-input school-number-input"
            />
            {errors.classSemester && <p className="error">{errors.classSemester.message}</p>}
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={formFieldsReview(5)}
          viewport={{ once: true, amount: 0.25 }}
          className="field-group"
        >
          <label className="form-label">Dodatkowe informacje</label>
          <textarea
            {...register("additionalInfo")}
            rows={4}
            maxLength={1000}
            className="form-input form-textarea"
          />
          {errors.additionalInfo && <p className="error">{errors.additionalInfo.message}</p>}
        </motion.div>

        <motion.button
          initial="hidden"
          whileInView="show"
          variants={formFieldsReview(6)}
          viewport={{ once: true, amount: 0.25 }}
          type="submit"
          className="submit-btn"
        >
          Wyślij
        </motion.button>
      </form>
    </>
  );
};

export default ContactForm;
