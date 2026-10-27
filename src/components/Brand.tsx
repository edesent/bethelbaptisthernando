/** The church's own logo, rebuilt as a sharp, resolution-independent SVG. */
export default function Brand({ tone = "white", className = "" }: { tone?: "white" | "dark"; className?: string }) {
  return (
    <img
      src={tone === "white" ? "/logo-white.svg" : "/logo-dark.svg"}
      alt="Bethel Baptist Church"
      width="928"
      height="395"
      className={`w-auto ${className}`}
    />
  );
}
