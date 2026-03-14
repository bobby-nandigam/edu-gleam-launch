import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Server, Database, Shield, Cpu, Wifi, Globe, Rocket, Sparkles, Heart, Crown, Star, Gem, Award } from "lucide-react";
import type { LaunchPhase } from "@/components/LaunchPage";

interface LaunchSequenceProps {
  phase: LaunchPhase;
  isFirstTime: boolean;
}

const SYSTEM_CHECKS = [
  { icon: Server, label: "Cloud Infrastructure", detail: "Global Edge Network" },
  { icon: Database, label: "Knowledge Database", detail: "100M+ Resources Indexed" },
  { icon: Shield, label: "Security Layer", detail: "Military-Grade Encryption" },
  { icon: Cpu, label: "AI Learning Engine", detail: "Next-Gen Neural Networks" },
  { icon: Wifi, label: "Real-Time Sync", detail: "Sub-10ms Latency" },
  { icon: Globe, label: "Global DNS", detail: "190+ Countries Ready" },
];

const POWER_METRICS = [
  { label: "Neural Cores", value: 100, suffix: "%" },
  { label: "Data Streams", value: 847, suffix: "K" },
  { label: "Edge Nodes", value: 184, suffix: "" },
  { label: "AI Models", value: 12, suffix: "" },
];

const STATS = [
  { value: "50K+", label: "Waiting Users" },
  { value: "500+", label: "Premium Courses" },
  { value: "99.99%", label: "Uptime" },
  { value: "< 10ms", label: "Response" },
];

const CountdownNumber = ({ number }: { number: number }) => (
  <motion.div
    key={number}
    className="text-[14rem] md:text-[18rem] font-black leading-none"
    style={{
      fontFamily: "var(--font-display)",
      background: "linear-gradient(180deg, hsl(0 0% 100%), hsl(217 91% 70%))",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
    initial={{ scale: 0.2, opacity: 0, rotateX: -90, filter: "blur(20px)" }}
    animate={{ scale: 1, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
    exit={{ scale: 3, opacity: 0, filter: "blur(30px)" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    {number}
  </motion.div>
);

const SystemCheckItem = ({ item, index, isActive }: { item: typeof SYSTEM_CHECKS[0]; index: number; isActive: boolean }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setChecked(true), 700);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <motion.div
      className="flex items-center gap-4 py-3.5 px-5"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 1.1, duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-700 ${
          checked
            ? "bg-accent/20 shadow-[0_0_20px_hsl(199_89%_48%_/_0.3)]"
            : "bg-primary-foreground/5"
        }`}
        animate={checked ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <item.icon className={`w-5 h-5 transition-colors duration-500 ${checked ? "text-accent" : "text-primary-foreground/60"}`} />
      </motion.div>
      <div className="flex-1">
        <div className="text-primary-foreground font-bold text-sm tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
          {item.label}
        </div>
        <div className="text-primary-foreground/40 text-xs" style={{ fontFamily: "var(--font-body)" }}>
          {item.detail}
        </div>
      </div>
      <div className="w-7 h-7 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {checked ? (
            <motion.div
              key="check"
              className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
            </motion.div>
          ) : isActive ? (
            <motion.div
              key="spinner"
              className="w-5 h-5 border-2 border-primary-foreground/10 border-t-accent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const PowerUpBar = ({ metric, index }: { metric: typeof POWER_METRICS[0]; index: number }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const steps = 60;
    const increment = metric.value / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), metric.value));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [metric.value]);

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold tracking-wider uppercase text-primary-foreground/60" style={{ fontFamily: "var(--font-body)" }}>
          {metric.label}
        </span>
        <span className="text-sm font-black text-accent" style={{ fontFamily: "var(--font-display)" }}>
          {current}{metric.suffix}
        </span>
      </div>
      <div className="h-1.5 bg-primary-foreground/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(217 91% 60%), hsl(199 89% 48%))" }}
          initial={{ width: "0%" }}
          animate={{ width: `${(current / metric.value) * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
};

const LaunchSequence = ({ phase, isFirstTime }: LaunchSequenceProps) => {
  const isActive = phase !== "idle" && phase !== "launching";
  const [countdown, setCountdown] = useState(5);
  const [activeCheckIndex, setActiveCheckIndex] = useState(0);

  useEffect(() => {
    if (phase === "systems") {
      setActiveCheckIndex(0);
      const interval = setInterval(() => {
        setActiveCheckIndex((prev) => {
          if (prev >= SYSTEM_CHECKS.length - 1) { clearInterval(interval); return prev; }
          return prev + 1;
        });
      }, 1100);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "countdown") {
      setCountdown(5);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) { clearInterval(interval); return 0; }
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
          style={{ background: "linear-gradient(135deg, hsl(222 59% 5%), hsl(217 50% 10%))" }}
          initial={{ clipPath: "circle(0% at 50% 55%)" }}
          animate={{ clipPath: "circle(150% at 50% 55%)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background radial */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(217_91%_60%_/_0.08)_0%,_transparent_50%)]" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(hsl(217 91% 60% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 60% / 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />

          <AnimatePresence mode="wait">
            {/* PHASE: IGNITION + SYSTEMS */}
            {(phase === "ignition" || phase === "systems") && (
              <motion.div
                key="systems"
                className="relative z-10 flex flex-col items-center w-full max-w-lg px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -30, filter: "blur(15px)" }}
                transition={{ duration: 0.6 }}
              >
                <motion.div className="mb-2 flex items-center gap-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <Cpu className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-accent" style={{ fontFamily: "var(--font-body)" }}>
                    {phase === "ignition" ? "Ignition Sequence Initiated" : "System Verification In Progress"}
                  </span>
                </motion.div>

                <motion.h2
                  className="text-3xl md:text-4xl font-black text-primary-foreground mb-8 tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Preparing for Launch
                </motion.h2>

                <div className="w-full glass-card rounded-2xl overflow-hidden divide-y divide-primary-foreground/5">
                  {SYSTEM_CHECKS.map((item, i) => (
                    <SystemCheckItem key={item.label} item={item} index={i} isActive={i <= activeCheckIndex && phase === "systems"} />
                  ))}
                </div>

                <div className="w-full mt-6 h-1.5 bg-primary-foreground/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, hsl(217 91% 60%), hsl(199 89% 48%))" }}
                    initial={{ width: "0%" }}
                    animate={{ width: phase === "systems" ? "100%" : "8%" }}
                    transition={{ duration: phase === "systems" ? 8 : 2, ease: "linear" }}
                  />
                </div>

                <motion.p
                  className="mt-4 text-[10px] text-primary-foreground/30 tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  All systems nominal • Zero anomalies detected
                </motion.p>
              </motion.div>
            )}

            {/* PHASE: POWER UP */}
            {phase === "powerup" && (
              <motion.div
                key="powerup"
                className="relative z-10 flex flex-col items-center w-full max-w-md px-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6"
                  animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 0px hsl(217 91% 60% / 0)", "0 0 60px hsl(217 91% 60% / 0.4)", "0 0 0px hsl(217 91% 60% / 0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Cpu className="w-10 h-10 text-accent" />
                </motion.div>

                <motion.h2
                  className="text-2xl md:text-3xl font-black text-primary-foreground mb-2 tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Maximum Power
                </motion.h2>
                <motion.p
                  className="text-primary-foreground/40 text-sm mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Charging all systems to full capacity
                </motion.p>

                <div className="w-full space-y-4">
                  {POWER_METRICS.map((metric, i) => (
                    <PowerUpBar key={metric.label} metric={metric} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* PHASE: COUNTDOWN */}
            {phase === "countdown" && (
              <motion.div
                key="countdown"
                className="relative z-10 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 5, filter: "blur(60px)" }}
                transition={{ duration: 0.8 }}
              >
                <motion.p
                  className="text-xs font-bold tracking-[0.5em] uppercase text-accent mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  T-MINUS
                </motion.p>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-64 h-64 rounded-full"
                      style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.2), transparent)" }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                  {/* Pulsing rings behind countdown */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <motion.div
                        className="w-40 h-40 rounded-full border border-primary/20"
                        animate={{ scale: [1, 2 + i], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      />
                    </motion.div>
                  ))}
                  <AnimatePresence mode="wait">
                    <CountdownNumber key={countdown} number={countdown} />
                  </AnimatePresence>
                </div>

                <motion.p
                  className="text-xl text-primary-foreground/50 mt-6 tracking-[0.2em] uppercase font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Until Unveiling
                </motion.p>
              </motion.div>
            )}

            {/* PHASE: LIFTOFF */}
            {phase === "liftoff" && (
              <motion.div
                key="liftoff"
                className="relative z-10 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Shockwave rings */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 rounded-full border-2 border-accent"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 25 + i * 8], opacity: [0.8, 0] }}
                    transition={{ duration: 2.5, delay: i * 0.25, ease: "easeOut" }}
                  />
                ))}

                <motion.div
                  initial={{ y: 0, scale: 1 }}
                  animate={{ y: -1000, scale: 0.2, rotate: -20 }}
                  transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Rocket className="w-24 h-24 text-accent drop-shadow-[0_0_40px_hsl(199,89%,48%,0.9)]" />
                </motion.div>

                <motion.h2
                  className="text-5xl md:text-6xl font-black tracking-tighter mt-8"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "linear-gradient(135deg, hsl(0 0% 100%), hsl(199 89% 60%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ opacity: 0, y: 40, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
                >
                  LIFTOFF!
                </motion.h2>

                <motion.div
                  className="flex gap-8 md:gap-12 mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + i * 0.15 }}
                    >
                      <div className="text-2xl md:text-3xl font-black text-accent" style={{ fontFamily: "var(--font-display)" }}>
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-primary-foreground/40 mt-1 tracking-wider uppercase" style={{ fontFamily: "var(--font-body)" }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* PHASE: INAUGURATION — Hema Saitha */}
            {phase === "inauguration" && (
              <motion.div
                key="inauguration"
                className="relative z-10 flex flex-col items-center text-center px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
              >
                {/* Grand background flash */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  style={{ background: "radial-gradient(circle at center, hsl(217 91% 60% / 0.15), transparent 60%)" }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Crown icon */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shadow-[0_0_60px_hsl(217_91%_60%_/_0.4)]">
                    <Crown className="w-10 h-10 text-accent" />
                  </div>
                </motion.div>

                {/* Inauguration badge */}
                <motion.div
                  className="flex items-center gap-2 mb-6 px-6 py-2 rounded-full border border-accent/30 bg-accent/5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                >
                  <Gem className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-accent" style={{ fontFamily: "var(--font-body)" }}>
                    Grand Inauguration
                  </span>
                  <Gem className="w-3.5 h-3.5 text-accent" />
                </motion.div>

                {/* Welcome text */}
                <motion.p
                  className="text-primary-foreground/50 text-sm tracking-[0.2em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-body)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Inaugurated By
                </motion.p>

                {/* Hema Saitha's name */}
                <motion.h1
                  className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(199 89% 70%) 50%, hsl(217 91% 80%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1, duration: 1, type: "spring", stiffness: 60 }}
                >
                  Hema Saitha
                </motion.h1>

                {/* Decorative line */}
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-accent/60" />
                  <Star className="w-4 h-4 text-accent" />
                  <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-accent/60" />
                </motion.div>

                <motion.p
                  className="text-primary-foreground/60 text-base md:text-lg max-w-md leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  The visionary behind Edunova — a platform built with passion to transform education for millions around the world.
                </motion.p>

                {/* Floating sparkles */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-accent"
                    initial={{ x: 0, y: 0, scale: 0 }}
                    animate={{
                      x: (Math.random() - 0.5) * 500,
                      y: (Math.random() - 0.5) * 400,
                      scale: [0, 1, 0],
                    }}
                    transition={{ duration: 3, delay: 1 + i * 0.1, repeat: Infinity, repeatDelay: 2 }}
                  />
                ))}
              </motion.div>
            )}

            {/* PHASE: THANK YOU */}
            {phase === "thankyou" && (
              <motion.div
                key="thankyou"
                className="relative z-10 flex flex-col items-center text-center px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
              >
                {/* Heart icon with glow */}
                <motion.div
                  className="mb-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.15, 1],
                      boxShadow: [
                        "0 0 0px hsl(199 89% 48% / 0)",
                        "0 0 80px hsl(199 89% 48% / 0.5)",
                        "0 0 0px hsl(199 89% 48% / 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-12 h-12 text-accent fill-accent" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "linear-gradient(135deg, hsl(0 0% 100%), hsl(199 89% 70%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 80 }}
                >
                  Thank You, Hema Saitha
                </motion.h2>

                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Award className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold tracking-[0.2em] uppercase text-accent" style={{ fontFamily: "var(--font-body)" }}>
                    Founder & Visionary
                  </span>
                  <Award className="w-5 h-5 text-accent" />
                </motion.div>

                <motion.p
                  className="text-primary-foreground/50 text-base md:text-lg max-w-lg leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  For your tireless dedication, your incredible vision, and your unwavering belief that education can change the world — this launch is a tribute to you. Edunova exists because of you. 🙏
                </motion.p>

                {/* Decorative elements */}
                <motion.div
                  className="flex items-center gap-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-primary/40" />
                  <span className="text-primary-foreground/30 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    With gratitude
                  </span>
                  <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-primary/40" />
                </motion.div>

                {/* Floating hearts */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: (Math.random() - 0.5) * 400,
                      y: (Math.random() - 0.5) * 300,
                      scale: [0, 1, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{ duration: 4, delay: 0.5 + i * 0.2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Heart className="w-4 h-4 text-accent/60 fill-accent/40" />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* PHASE: LIVE */}
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
                  animate={{ opacity: [0, 0.2, 0.08] }}
                  transition={{ duration: 2 }}
                />

                {/* Explosion sparkles */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-accent"
                    initial={{ x: 0, y: 0, scale: 0 }}
                    animate={{
                      x: (Math.random() - 0.5) * 800,
                      y: (Math.random() - 0.5) * 600,
                      scale: [0, 1.5, 0],
                    }}
                    transition={{ duration: 2.5, delay: i * 0.04 }}
                  />
                ))}

                {/* Live badge */}
                <motion.div
                  className="flex items-center gap-2 mb-6 px-6 py-2.5 rounded-full border border-accent/30 bg-accent/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                  <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-black tracking-[0.25em] uppercase text-accent" style={{ fontFamily: "var(--font-body)" }}>
                    NOW LIVE
                  </span>
                </motion.div>

                <motion.h1
                  className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "linear-gradient(135deg, hsl(0 0% 100%), hsl(199 89% 65%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ opacity: 0, y: 40, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1, type: "spring" }}
                >
                  EDUNOVA IS LIVE
                </motion.h1>

                <motion.p
                  className="text-primary-foreground/50 text-base md:text-lg mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  The future of education starts now
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, rotate: -180, scale: 0 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                >
                  <Sparkles className="w-12 h-12 text-accent" />
                </motion.div>

                <motion.div
                  className="mt-8 flex flex-col items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <motion.div
                    className="w-6 h-6 border-2 border-primary-foreground/20 border-t-accent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-xs text-primary-foreground/30 tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    Entering Edunova...
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
