"use client";

import { useEffect, useRef } from "react";

// Settles a sheet up into place the first time it scrolls into view.
// Content is visible by default; only sheets still below the fold are held back.
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    node.setAttribute("data-hidden", "");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.removeAttribute("data-hidden");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`herb-reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
