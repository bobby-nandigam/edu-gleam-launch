import { useMemo } from "react";

const Particles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: `${Math.random() * 8 + 4}s`,
      delay: `${Math.random() * 6}s`,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full bg-primary animate-float-particle"
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

export default Particles;
