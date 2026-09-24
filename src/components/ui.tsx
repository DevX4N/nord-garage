import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1340px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

/** Small technical section label with accent rule */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-mute", className)}>
      <span className="h-px w-7 shrink-0 bg-lime/80" aria-hidden />
      <span>{children}</span>
    </div>
  );
}

/** Italic serif accent word inside headlines */
export function It({ children }: { children: ReactNode }) {
  return <em className="it">{children}</em>;
}

/** Soft fade + rise reveal on scroll */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      transition={{ duration: 0.95, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Masked line reveal for headlines */
export function MLine({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block pb-[0.09em] -mb-[0.09em] will-change-transform"
        initial={{ y: "112%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{ duration: 1.15, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Accent / ghost CTA used across the site (anchor or button) */
export function CTA({
  href,
  children,
  variant = "primary",
  className,
  icon,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  icon?: ReactNode;
  type?: "submit" | "button";
}) {
  const Tag: any = href ? motion.a : motion.button;
  return (
    <Tag
      href={href}
      type={href ? undefined : type ?? "button"}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 430, damping: 26 }}
      className={cn(
        "group inline-flex h-[52px] cursor-pointer items-center justify-center gap-3 rounded-[4px] px-7 text-[14px] font-semibold tracking-[-0.005em] transition-colors duration-300",
        variant === "primary"
          ? "bg-lime text-[#0C0D09] hover:bg-[#E6FF70]"
          : "border border-white/15 text-bone hover:border-lime/60 hover:text-lime",
        className
      )}
    >
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[2px]">
        {icon ?? <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />}
      </span>
    </Tag>
  );
}

/** Small bordered technical chip */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3.5 py-[7px] font-mono text-[9.5px] uppercase tracking-[0.22em] text-metal backdrop-blur-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Image with extremely subtle scroll parallax inside an overflow-hidden frame */
export function ParallaxImg({
  src,
  alt,
  className,
  imgClassName,
  speed = 26,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className={cn("h-full w-full scale-[1.15] object-cover will-change-transform", imgClassName)}
      />
      {children}
    </div>
  );
}

/** Discreet animated counter (pt-BR formatting) */
export function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.9,
      ease: EASE,
      onUpdate: (v) => setDisplay(v.toFixed(decimals).replace(".", ",")),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);
  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
