const OrbitalRings = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Ring 1 */}
      <div
        className="absolute w-[130%] h-[130%] rounded-full border border-primary/20 animate-spin-slow"
        style={{ ["--orbit-speed" as string]: "20s" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary glow-blue" />
      </div>

      {/* Ring 2 */}
      <div
        className="absolute w-[160%] h-[160%] rounded-full border border-accent/10 animate-counter-spin"
      >
        <div className="absolute bottom-0 left-1/4 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent glow-cyan" />
      </div>

      {/* Ring 3 - tilted */}
      <div
        className="absolute w-[145%] h-[90%] rounded-full border border-primary/10 animate-spin-slow rotate-45"
        style={{ animationDuration: "25s" }}
      >
        <div className="absolute top-1/2 right-0 translate-x-1/2 w-1 h-1 rounded-full bg-primary/60" />
      </div>
    </div>
  );
};

export default OrbitalRings;
