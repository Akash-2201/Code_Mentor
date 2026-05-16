export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-white" />

      <div className="landing-gradient-mesh absolute -inset-[20%] opacity-80">
        <div className="absolute left-[10%] top-[5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] landing-orb" />
        <div className="absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.06)_0%,transparent_70%)] landing-orb landing-orb-delay-1" />
        <div className="absolute bottom-[10%] left-[30%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(228,228,231,0.9)_0%,transparent_70%)] landing-orb landing-orb-delay-2" />
      </div>

      <div
        className="landing-grid-pulse absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#ffffff_80%)]" />

      <div className="landing-scan-beam absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path
              d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-zinc-400"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>
    </div>
  );
}
