import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import orbGlow from "@/assets/orb-glow.png";
import PremiumParticles from "@/components/PremiumParticles";
import OrbitalRings from "@/components/OrbitalRings";
import LaunchSequence from "@/components/LaunchSequence";
import { Rocket, Zap, Globe, Shield, Star, Award, Users } from "lucide-react";

const REDIRECT_URL = "https://edunoova.lovable.app";

export type LaunchPhase =
  | "idle"
  | "launching"
  | "ignition"
  | "systems"
  | "powerup"
  | "countdown"
  | "liftoff"
  | "inauguration"
  | "thankyou"
  | "live";

const LaunchPage = () => {
  const [phase, setPhase] = useState<LaunchPhase>("idle");
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const launched = localStorage.getItem("edunova-inaugurated");
    if (launched === "true") {
      setIsFirstTime(false);
    }
  }, []);

  const handleLaunch = useCallback(() => {
    setPhase("launching");
    // 35+ second premier launch timeline
    setTimeout(() => setPhase("ignition"), 2000);
    setTimeout(() => setPhase("systems"), 5000);
    setTimeout(() => setPhase("powerup"), 14000);
    setTimeout(() => setPhase("countdown"), 19000);
    setTimeout(() => setPhase("liftoff"), 25000);

    if (!localStorage.getItem("edunova-inaugurated")) {
      setTimeout(() => setPhase("inauguration"), 30000);
      setTimeout(() => setPhase("thankyou"), 36000);
      setTimeout(() => setPhase("live"), 42000);
      setTimeout(() => {
        localStorage.setItem("edunova-inaugurated", "true");
        window.location.href = REDIRECT_URL;
      }, 48000);
    } else {
      setTimeout(() => setPhase("live"), 30000);
      setTimeout(() => {
        window.location.href = REDIRECT_URL;
      }, 36000);
    }
  }, []);

  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background */}
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(217_91%_60%_/_0.12)_0%,_transparent_50%)]" />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(217 91% 60% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 60% / 0.4) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Dual scanning beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[200%] h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-beam" />
        <div className="absolute w-[2px] h-[200%] bg-gradient-to-b from-transparent via-accent/20 to-transparent animate-beam" style={{ animationDelay: "2s" }} />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/20 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/20 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20 rounded-br-3xl" />

      <PremiumParticles />

      {/* Main idle content */}
      <AnimatePresence mode="wait">
        {(phase === "idle" || phase === "launching") && (
          <motion.div
            className="relative z-10 flex flex-col items-center px-6"
            exit={{ opacity: 0, scale: 0.85, filter: "blur(30px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Top premiere badge */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="glass-card rounded-full px-6 py-2.5 flex items-center gap-3 mb-6"
            >
              <Star className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-accent" style={{ fontFamily: "var(--font-body)" }}>
                World Premiere • Product Launch Event
              </span>
              <Star className="w-3.5 h-3.5 text-accent" />
            </motion.div>

            {/* Orb visual — larger and more dramatic */}
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1.5, type: "spring", stiffness: 40 }}
            >
              <div className="relative w-52 h-52 md:w-72 md:h-72">
                <img
                  src={orbGlow}
                  alt=""
                  className="w-full h-full object-contain animate-breathe drop-shadow-[0_0_60px_hsl(217,91%,60%,0.5)]"
                />
                <OrbitalRings />
                {/* Inner pulse */}
                <motion.div
                  className="absolute inset-[20%] rounded-full"
                  style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.15), transparent)" }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Main title */}
            <motion.h1
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-none mb-2"
              style={{
                fontFamily: "var(--font-display)",
                background: "linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(217 91% 80%) 50%, hsl(199 89% 60%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.7, duration: 1.2, type: "spring", stiffness: 50 }}
            >
              EDUNOVA
            </motion.h1>

            {/* Tagline */}
            <motion.div
              className="flex items-center gap-4 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/60" />
              <span className="text-gradient-blue text-lg md:text-xl font-bold tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
                Redefining Education Forever
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/60" />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-muted-foreground text-sm md:text-base max-w-lg text-center mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              style={{ fontFamily: "var(--font-body)" }}
            >
              The world's most advanced learning platform — built for visionaries, dreamers, and future leaders. Today, we change everything.
            </motion.p>

            {/* Trust badges — enterprise level */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              {[
                { icon: Globe, label: "190+ Countries" },
                { icon: Shield, label: "Enterprise Security" },
                { icon: Zap, label: "AI-Powered" },
                { icon: Users, label: "50K+ Waiting" },
                { icon: Award, label: "Award Winning" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ fontFamily: "var(--font-body)" }}>{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Launch button — premier style */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="relative"
            >
              {/* Outer glow rings */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-primary/10"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-16 rounded-full border border-primary/5"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              />

              <motion.button
                onClick={handleLaunch}
                disabled={phase === "launching"}
                className="group relative cursor-pointer overflow-hidden rounded-full disabled:cursor-wait"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer rounded-full" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />

                <div className="relative flex items-center gap-3 px-14 py-5 md:px-20 md:py-6 bg-gradient-to-r from-primary to-accent rounded-full">
                  <AnimatePresence mode="wait">
                    {phase === "idle" ? (
                      <motion.div key="idle" className="flex items-center gap-3" exit={{ opacity: 0, y: -20 }}>
                        <Rocket className="w-5 h-5 text-primary-foreground" />
                        <span className="text-primary-foreground font-black text-lg tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
                          UNVEIL EDUNOVA
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div key="launching" className="flex items-center gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <motion.div
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="text-primary-foreground font-black text-lg tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
                          INITIATING...
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>

            {/* Status line */}
            <motion.div
              className="mt-10 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                {isFirstTime ? "Grand Inauguration • First Launch" : "All Systems Online • Ready to Deploy"}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launch sequence overlay */}
      <LaunchSequence phase={phase} isFirstTime={isFirstTime} />
    </div>
  );
};

export default LaunchPage;
