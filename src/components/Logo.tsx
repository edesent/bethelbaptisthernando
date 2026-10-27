/**
 * Their logo, redrawn: the gold outline of a house with an open bottom and a
 * cross standing inside it. Same concept and colour as the PNG on their site,
 * drawn as geometry so it is crisp at any size. `tone` picks the colour.
 */
export default function Logo({
  className = "",
  tone = "gold",
  title = "Bethel Baptist Church",
  decorative = false,
}: {
  className?: string;
  tone?: "gold" | "white" | "ink";
  title?: string;
  decorative?: boolean;
}) {
  const color = tone === "gold" ? "var(--gold)" : tone === "white" ? "#fff" : "var(--brown)";
  return (
    <svg
      viewBox="0 0 100 118"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      fill="none"
      stroke={color}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {/* roof: a gap at the left eave, as in the original */}
      <path d="M 6 46 L 50 10 L 94 46" strokeWidth="9" />
      {/* walls, open at the bottom centre */}
      <path d="M 16 50 V 110 H 40" strokeWidth="9" />
      <path d="M 84 50 V 110 H 60" strokeWidth="9" />
      {/* cross */}
      <path d="M 50 36 V 110" strokeWidth="8" />
      <path d="M 32 58 H 68" strokeWidth="8" />
    </svg>
  );
}
