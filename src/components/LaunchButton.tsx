import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

interface LaunchButtonProps {
  onClick: () => void;
}

const LaunchButton = ({ onClick }: LaunchButtonProps) => {
  return (
    <div className="relative">
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
      <span className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-ring" style={{ animationDelay: "1s" }} />

      <motion.button
        onClick={onClick}
        className="relative px-12 py-5 rounded-full bg-primary text-primary-foreground font-semibold text-lg tracking-wide launch-glow cursor-pointer flex items-center gap-3"
        style={{ fontFamily: "var(--font-body)" }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 80px hsl(160 84% 39% / 0.6), 0 0 120px hsl(160 84% 39% / 0.3)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Rocket className="w-5 h-5" />
        Launch Now
      </motion.button>
    </div>
  );
};

export default LaunchButton;
