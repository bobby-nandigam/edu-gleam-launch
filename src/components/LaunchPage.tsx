import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "@/components/Particles";
import LaunchButton from "@/components/LaunchButton";

const REDIRECT_URL = "https://edunoova.lovable.app";

const LaunchPage = () => {
  const [launched, setLaunched] = useState(false);
  const [expandComplete, setExpandComplete] = useState(false);

  const handleLaunch = useCallback(() => {
    setLaunched(true);
  }, []);

  const handleExpandDone = useCallback(() => {
    setExpandComplete(true);
    setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, 400);
  }, []);

  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Ambient particles */}
      <Particles />

      {/* Radial gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(160_84%_39%_/_0.06)_0%,_transparent_70%)]" />

      {/* Content */}
      <AnimatePresence>
        {!launched && (
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
          >
            {/* Subhead */}
            <motion.p
              className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ fontFamily: "var(--font-body)" }}
            >
              Ready for launch
            </motion.p>

            {/* Main title */}
            <motion.h1
              className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-foreground"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 80 }}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Edunova
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ fontFamily: "var(--font-body)" }}
            >
              is Live
            </motion.p>

            {/* Launch button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-8"
            >
              <LaunchButton onClick={handleLaunch} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen expansion overlay */}
      <AnimatePresence>
        {launched && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
            initial={{ clipPath: "circle(0% at 50% 60%)" }}
            animate={{ clipPath: "circle(150% at 50% 60%)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={handleExpandDone}
          >
            <AnimatePresence>
              {expandComplete && (
                <motion.div
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="w-12 h-12 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-primary-foreground font-medium text-lg" style={{ fontFamily: "var(--font-body)" }}>
                    Launching Edunova…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LaunchPage;
