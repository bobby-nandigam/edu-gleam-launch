import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface LaunchSequenceProps {
  phase: "idle" | "launching" | "expanding" | "redirecting";
}

const LaunchSequence = ({ phase }: LaunchSequenceProps) => {
  const isActive = phase === "expanding" || phase === "redirecting";

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(199 89% 48%))" }}
          initial={{ clipPath: "circle(0% at 50% 55%)" }}
          animate={{ clipPath: "circle(150% at 50% 55%)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* Success check */}
            <motion.div
              className="w-20 h-20 rounded-full border-2 border-primary-foreground/40 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            >
              <AnimatePresence>
                {phase === "redirecting" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check className="w-10 h-10 text-primary-foreground" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-8 h-8 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    style={{ borderWidth: 3 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl font-black text-primary-foreground tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {phase === "redirecting" ? "EDUNOVA IS LIVE!" : "LAUNCHING..."}
            </motion.h2>

            <motion.p
              className="text-primary-foreground/70 text-sm tracking-widest uppercase"
              style={{ fontFamily: "var(--font-body)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {phase === "redirecting" ? "Redirecting you now..." : "Preparing your experience"}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="w-48 h-1 bg-primary-foreground/20 rounded-full overflow-hidden mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-primary-foreground rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LaunchSequence;
