/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

import "./ParticlesBG.scss";
import { motion } from "framer-motion";
import { backdropVariants } from "../../animations/motionPresets";

export const ParticlesBG = () => {
  const [init, setInit] = useState(false);
  const containerRef = useRef<Container | null>(null);
  const monitorRef = useRef<number | null>(null); // holds interval id

  // initialize engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  // called by the Particles component once container is ready
  const particlesLoaded = async (container?: Container): Promise<void> => {
    if (!container) return;
    // console.log("particlesLoaded -> container ready:", container);
    containerRef.current = container;

    // optional: inspect what particle API is available
    try {
      // log publicly available particle keys to see what's present
      // console.log("particles keys:", Object.keys(container.particles));
    } catch (e) {
      // ignore
      console.log("error: ", e);
    }

    // start monitor if not already started
    if (monitorRef.current == null) startMonitor();
  };

  // start periodic monitor (starts only when containerRef is set)
  const startMonitor = () => {
    // don't start twice
    if (monitorRef.current != null) return;

    monitorRef.current = window.setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      // safe guard: skip if container destroyed / paused
      if ((container as any).destroyed || (container as any).paused) return;

      // Prefer public property `container.particles.count` if available
      const particlesManager = container.particles;
      let count: number | null = null;

      // If `count` exists (common in recent versions)
      if (typeof (particlesManager as any).count === "number") {
        count = (particlesManager as any).count as number;
      } else if (Array.isArray((particlesManager as any).array)) {
        // fallback: some versions expose internal `array`
        count = ((particlesManager as any).array as unknown[]).length;
      } else {
        // last resort: try container.getAnimationStatus or skip
        console.log("Cannot determine particle count from public API for this version.");
      }

      if (typeof count === "number") {
        if (count > 120) {
          console.log(`🔄 Too many particles (${count}), refreshing…`);
          container.refresh();
        }
      }
    }, 10000);
  };

  // cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (monitorRef.current != null) {
        clearInterval(monitorRef.current);
        monitorRef.current = null;
      }
    };
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#050505",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 5,
          },
          repulse: {
            distance: 150,
            duration: 0.25,
          },
        },
      },
      particles: {
        color: {
          value: "#fefefe",
        },
        links: {
          color: "#fefefe",
          distance: 175,
          enable: true,
          opacity: 0.35,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 100,
        },
        opacity: {
          value: 0.35,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 4 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <motion.div
        initial="hidden"
        animate="show"
        exit="exit"
        variants={backdropVariants}
        className="particles-background-effect"
      >
        <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
      </motion.div>
    );
  }

  return <></>;
};
