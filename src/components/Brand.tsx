import Logo from "./Logo";

/**
 * The church's logo rebuilt as vector geometry and live type. The original
 * bitmap made the small “Baptist Church” line fuzzy when scaled into the
 * header; this lockup stays sharp at every pixel density.
 */
export default function Brand({
  tone = "white",
  size = "header",
  className = "",
}: {
  tone?: "white" | "dark";
  size?: "header" | "footer";
  className?: string;
}) {
  const isFooter = size === "footer";

  return (
    <span
      className={`inline-flex items-center ${isFooter ? "h-20 gap-3.5" : "h-12 gap-2.5 md:h-[4.1rem] md:gap-3"} ${className}`}
      role="img"
      aria-label="Bethel Baptist Church"
    >
      <Logo className="h-full w-auto shrink-0" decorative />
      <span className={`flex flex-col leading-none ${tone === "white" ? "text-white" : "text-brown"}`} aria-hidden="true">
        <span className={`font-extrabold leading-[0.78] tracking-[0.035em] ${isFooter ? "text-[2.55rem]" : "text-[1.6rem] md:text-[2.2rem]"}`}>
          BETHEL
        </span>
        <span
          className={`mt-2 whitespace-nowrap font-medium uppercase leading-none ${
            isFooter ? "text-[0.76rem] tracking-[0.3em]" : "text-[0.5rem] tracking-[0.27em] md:text-[0.66rem] md:tracking-[0.3em]"
          }`}
        >
          Baptist Church
        </span>
      </span>
    </span>
  );
}
