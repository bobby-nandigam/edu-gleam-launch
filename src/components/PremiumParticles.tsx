import { useMemo } from "react";

const PremiumParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: `${Math.random() * 10 + 6}s`,
      delay: `${Math.random() * 8}s`,
      opacity: Math.random() * 0.6 + 0.1,
      isBlue: Math.random() > 0.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute bottom-0 rounded-full animate-float-up ${
            p.isBlue ? "bg-primary" : "bg-accent"
          }`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            ["--duration" as string]: p.duration,
            ["--delay" as string]: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default PremiumParticles;
