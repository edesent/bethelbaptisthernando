"use client";

import { useEffect, useRef } from "react";

/**
 * The pastor preaching in front of the mural, as a silent 30-second loop
 * behind the home-page headline. The poster frame stands in until the video
 * can play, and stays put for anyone who prefers reduced motion. `muted` and
 * `playsInline` are set as properties, because Safari ignores the attributes
 * for autoplay.
 */
export default function HeroVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    const play = () => v.play().catch(() => {});
    if (v.readyState >= 2) play();
    else v.addEventListener("canplay", play, { once: true });
    return () => v.removeEventListener("canplay", play);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster="/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      disablePictureInPicture
    >
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
