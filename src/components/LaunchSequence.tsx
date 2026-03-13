import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Server, Database, Shield, Cpu, Wifi, Globe, Rocket, Sparkles } from "lucide-react";
import type { LaunchPhase } from "@/components/LaunchPage";

interface LaunchSequenceProps {
  phase: LaunchPhase;
}

// System check items
const SYSTEM_CHECKS = [
  { icon: Server, label: "Server Infrastructure", detail: "AWS ap-south-1" },
  { icon: Database, label: "Database Clusters", detail: "PostgreSQL 16" },
  { icon: Shield, label: "Security Protocols", detail: "TLS 1.3 / AES-256" },
  { icon: Cpu, label: "AI Engine", detail: "GPT-4 Turbo Ready" },
  { icon: Wifi, label: "CDN Edge Network", detail: "184 PoPs Worldwide" },
  { icon: Globe, label: "DNS Propagation", detail: "edunoova.lovable.app" },
];

const STATS = [
  { value: "50K+", label: "Early Signups" },
  { value: "120+", label: "Courses Ready" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 50ms", label: "Response Time" },
];

const CountdownNumber = ({ number }: { number: number }) => (
  <motion.div
    key={number}
    className="text-[12rem] md:text-[16rem] font-black text-primary-foreground leading-none"
    style={{ fontFamily: "var(--font-display)" }}
    initial={{ scale: 0.3, opacity: 0, rotateX: -90 }}
    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
    exit={{ scale: 2, opacity: 0, filter: "blur(20px)" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    {number}
  </motion.div>
);

const SystemCheckItem = ({ item, index, isActive }: { item: typeof SYSTEM_CHECKS[0]; index: number; isActive: boolean }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setChecked(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <motion.div
      className="flex items-center gap-4 py-3 px-4"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 1.2, duration: 0.5 }}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500 ${
        checked ? "bg-primary-foreground/20" : "bg-primary-foreground/5"
      }`}>
        <item.icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <div className="flex-1">
        <div className="text-primary-foreground font-semibold text-sm" style={{ fontFamily: "var(--font-display)" }}>
          {item.label}
        </div>
        <div className="text-primary-foreground/50 text-xs" style={{ fontFamily: "var(--font-body)" }}>
          {item.detail}
        </div>
      </div>
      <div className="w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {checked ? (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Check className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
            </motion.div>
          ) : isActive ? (
            <motion.div
              key="spinner"
              className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const LaunchSequence = ({ phase }: LaunchSequenceProps) => {
  const isActive = phase !== "idle" && phase !== "launching";
  const [countdown, setCountdown] = useState(5);
  const [activeCheckIndex, setActiveCheckIndex] = useState(0);

  // Manage system checks progression
  useEffect(() => {
    if (phase === "systems") {
      setActiveCheckIndex(0);
      const interval = setInterval(() => {
        setActiveCheckIndex((prev) => {
          if (prev >= SYSTEM_CHECKS.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Countdown timer
  useEffect(() => {
    if (phase === "countdown") {
      setCountdown(5);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(222 59% 8%), hsl(217 50% 12%))" }}
          initial={{ clipPath: "circle(0% at 50% 55%)" }}
          animate={{ clipPath: "circle(150% at 50% 55%)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(217_91%_60%_/_0.1)_0%,_transparent_60%)]" />

          {/* Animated grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(hsl(217 91% 60% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 60% / 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          {/* PHASE: IGNITION — System checks */}
          <AnimatePresence mode="wait">
            {(phase === "ignition" || phase === "systems") && (
              <motion.div
                key="systems"
                className="relative z-10 flex flex-col items-center w-full max-w-lg px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
              >
                {/* Phase title */}
                <motion.div
                  className="mb-2 flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Cpu className="w-4 h-4 text-accent" />
                  <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent" style={{ fontFamily: "var(--font-body)" }}>
                    {phase === "ignition" ? "Ignition Sequence" : "System Verification"}
                  </span>
                </motion.div>

                <motion.h2
                  className="text-2xl md:text-3xl font-black text-primary-foreground mb-8 tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Initializing Systems
                </motion.h2>

                {/* System check list */}
                <div className="w-full glass-card rounded-2xl overflow-hidden divide-y divide-primary-foreground/5">
                  {SYSTEM_CHECKS.map((item, i) => (
                    <SystemCheckItem
                      key={item.label}
                      item={item}
                      index={i}
                      isActive={i <= activeCheckIndex && phase === "systems"}
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <div className="w-full mt-6 h-1 bg-primary-foreground/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, hsl(217 91% 60%), hsl(199 89% 48%))" }}
                    initial={{ width: "0%" }}
                    animate={{ width: phase === "systems" ? "100%" : "10%" }}
                    transition={{ duration: phase === "systems" ? 9 : 2, ease: "linear" }}
                  />
                </div>

                <motion.p
                  className="mt-4 text-xs text-primary-foreground/40 tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  All systems nominal
                </motion.p>
              </motion.div>
            )}

            {/* PHASE: COUNTDOWN */}
            {phase === "countdown" && (
              <motion.div
                key="countdown"
                className="relative z-10 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 3, filter: "blur(40px)" }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-sm font-semibold tracking-[0.4em] uppercase text-accent mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  T-MINUS
                </motion.p>

                <div className="relative">
                  {/* Glow behind number */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-48 h-48 rounded-full"
                      style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.3), transparent)" }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    <CountdownNumber key={countdown} number={countdown} />
                  </AnimatePresence>
                </div>

                <motion.p
                  className="text-lg text-primary-foreground/60 mt-4 tracking-wider uppercase font-medium"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Until Launch
                </motion.p>
              </motion.div>
            )}

            {/* PHASE: LIFTOFF — Explosion */}
            {phase === "liftoff" && (
              <motion.div
                key="liftoff"
                className="relative z-10 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Expanding rings */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 rounded-full border-2 border-accent"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 20 + i * 10], opacity: [1, 0] }}
                    transition={{ duration: 2, delay: i * 0.3, ease: "easeOut" }}
                  />
                ))}

                {/* Rocket icon blasting up */}
                <motion.div
                  initial={{ y: 0, scale: 1 }}
                  animate={{ y: -800, scale: 0.3, rotate: -15 }}
                  transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Rocket className="w-20 h-20 text-accent drop-shadow-[0_0_30px_hsl(199,89%,48%,0.8)]" />
                </motion.div>

                <motion.h2
                  className="text-4xl md:text-5xl font-black text-primary-foreground tracking-tight mt-8"
                  style={{ fontFamily: "var(--font-display)" }}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                >
                  LIFTOFF!
                </motion.h2>

                {/* Stats row */}
                <motion.div
                  className="flex gap-8 mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + i * 0.15 }}
                    >
                      <div className="text-2xl md:text-3xl font-black text-accent" style={{ fontFamily: "var(--font-display)" }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-primary-foreground/50 mt-1 tracking-wider uppercase" style={{ fontFamily: "var(--font-body)" }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* PHASE: LIVE — Final celebration */}
            {phase === "live" && (
              <motion.div
                key="live"
                className="relative z-10 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Background flash */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  style={{ background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(199 89% 48%))" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0.1] }}
                  transition={{ duration: 1.5 }}
                />

                {/* Sparkle particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-accent"
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 600,
                      y: (Math.random() - 0.5) * 400,
                      scale: [0, 1.5, 0],
                    }}
                    transition={{ duration: 2, delay: i * 0.05 }}
                  />
                ))}

                {/* Live badge */}
                <motion.div
                  className="flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-accent/30 bg-accent/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-bold tracking-[0.2em] uppercase text-accent" style={{ fontFamily: "var(--font-body)" }}>
                    NOW LIVE
                  </span>
                </motion.div>

                {/* Main title */}
                <motion.h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "linear-gradient(135deg, hsl(0 0% 100%), hsl(199 89% 68%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                >
                  EDUNOVA IS LIVE
                </motion.h1>

                <motion.p
                  className="text-primary-foreground/60 text-base md:text-lg mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Welcome to the future of education
                </motion.p>

                {/* Sparkle icon */}
                <motion.div
                  initial={{ opacity: 0, rotate: -180, scale: 0 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                >
                  <Sparkles className="w-10 h-10 text-accent" />
                </motion.div>

                {/* Redirect notice */}
                <motion.div
                  className="mt-8 flex flex-col items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <motion.div
                    className="w-6 h-6 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-xs text-primary-foreground/40 tracking-widest uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    Redirecting to Edunova...
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LaunchSequence;
