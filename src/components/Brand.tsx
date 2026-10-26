import Image from "next/image";

/** The church's own logo, trimmed from their PNG. White lettering for dark surfaces, brown for light ones. */
export default function Brand({ tone = "white", className = "" }: { tone?: "white" | "dark"; className?: string }) {
  return (
    <Image
      src={tone === "white" ? "/logo-white.png" : "/logo-dark.png"}
      alt="Bethel Baptist Church"
      width={928}
      height={395}
      priority
      className={`w-auto ${className}`}
    />
  );
}
