import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Square display-face button with an arrow. tone: "fill" (signal yellow), "outline" (yellow line, for green fields),
// "dark" (forest fill, for yellow and cream fields), "dark-outline" (forest line).
export default function SigButton({ href, children, tone = "fill", arrow = true, className = "", external = false }) {
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} className={`sig-btn ${className}`} {...{ [`data-${tone}`]: "" }} {...props}>
      <span>{children}</span>
      {arrow ? <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} /> : null}
    </Link>
  );
}
