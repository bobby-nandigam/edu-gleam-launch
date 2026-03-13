import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import orbGlow from "@/assets/orb-glow.png";
import PremiumParticles from "@/components/PremiumParticles";
import OrbitalRings from "@/components/OrbitalRings";
import LaunchSequence from "@/components/LaunchSequence";
import { Rocket, Zap, Globe, Shield } from "lucide-react";

const REDIRECT_URL = "https://edunoova.lovable.app";

export type LaunchPhase = "idle" | "launching" | "ignition" | "systems" | "countdown" | "liftoff" | "live";

const LaunchPage = () => {
  const [phase, setPhase] = useState<LaunchPhase>("idle");

  const handleLaunch = useCallback(() => {
    setPhase("launching");
    // Phase timeline (30+ seconds total)
    setTimeout(() => setPhase("ignition"), 2000);     // 2s: button spinner
    setTimeout(() => setPhase("systems"), 5000);       // 5s: system checks
    setTimeout(() => setPhase("countdown"), 15000);    // 15s: countdown 5-4-3-2-1
    setTimeout(() => setPhase("liftoff"), 21000);      // 21s: liftoff explosion
    setTimeout(() => setPhase("live"), 27000);         // 27s: EDUNOVA IS LIVE
    setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, 32000);                                         // 32s: redirect
  }, []);

  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(217_91%_60%_/_0.08)_0%,_transparent_60%)]" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(217 91% 60% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 60% / 0.3) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Scanning beam */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[200%] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-beam" />
      </div>

      {/* Particles */}
      <PremiumParticles />

      {/* Main content */}
      <AnimatePresence mode="wait">
        {(phase === "idle" || phase === "launching") && (
          <motion.div
            className="relative z-10 flex flex-col items-center"
            exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="glass-card rounded-full px-5 py-2 flex items-center gap-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                Product Launch Event
              </span>
            </motion.div>

            {/* Orb visual */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.2, type: "spring", stiffness: 60 }}
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <img
                  src={orbGlow}
                  alt=""
                  className="w-full h-full object-contain animate-breathe drop-shadow-[0_0_40px_hsl(217,91%,60%,0.4)]"
                />
                <OrbitalRings />
              </div>
            </motion.div>

            {/* Main title */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-gradient-white leading-none mb-3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, type: "spring", stiffness: 60 }}
              style={{ fontFamily: "var(--font-display)" }}
            >
              EDUNOVA
            </motion.h1>

            {/* Subtitle with gradient */}
            <motion.p
              className="text-gradient-blue text-xl md:text-2xl font-semibold tracking-[0.15em] uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Future of Learning
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-muted-foreground text-sm md:text-base max-w-md text-center mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              style={{ fontFamily: "var(--font-body)" }}
            >
              World-class education platform crafted for the next generation of innovators, builders, and leaders.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              className="flex items-center gap-6 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              {[
                { icon: Globe, label: "Global Access" },
                { icon: Shield, label: "Enterprise Grade" },
                { icon: Zap, label: "Lightning Fast" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Launch button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <motion.button
                onClick={handleLaunch}
                disabled={phase === "launching"}
                className="group relative cursor-pointer overflow-hidden rounded-2xl disabled:cursor-wait"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer rounded-2xl" />

                {/* Button glow background */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-60 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />

                {/* Button content */}
                <div className="relative flex items-center gap-3 px-12 py-5 md:px-16 md:py-6 bg-gradient-to-r from-primary to-accent rounded-2xl border-glow">
                  <AnimatePresence mode="wait">
                    {phase === "idle" ? (
                      <motion.div
                        key="idle"
                        className="flex items-center gap-3"
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <Rocket className="w-5 h-5 text-primary-foreground" />
                        <span className="text-primary-foreground font-bold text-lg tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
                          GO LIVE NOW
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="launching"
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <motion.div
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="text-primary-foreground font-bold text-lg tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
                          LAUNCHING...
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>

            {/* Bottom status */}
            <motion.div
              className="mt-8 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-muted-foreground tracking-wider uppercase" style={{ fontFamily: "var(--font-body)" }}>
                Systems Online — Ready to Deploy
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launch sequence overlay */}
      <LaunchSequence phase={phase} />
    </div>
  );
};

export default LaunchPage;
