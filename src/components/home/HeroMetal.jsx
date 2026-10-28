"use client";

import dynamic from "next/dynamic";

// The WebGL ribbons ship as their own chunk, fetched after hydration and never rendered on the server.
// Until it lands (or where WebGL is missing) the sheet simply stays white.
const ShaderMetal = dynamic(() => import("@/components/ui/shader-metal"), { ssr: false, loading: () => null });

export default function HeroMetal({ className }) {
  return (
    <ShaderMetal
      className={className}
      color="#DCE8DF"
      ribbons={3}
      speed={0.32}
      iridescence={0.22}
      interactive
      theme="light"
    />
  );
}
