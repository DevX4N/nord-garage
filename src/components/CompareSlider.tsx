import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "../utils/cn";

/**
 * Interactive Before/After comparator.
 * The same framing is used on both sides; CSS filters + a swirl-mark
 * overlay simulate the paint before correction.
 */
export default function CompareSlider({
  hClass = "h-[380px] sm:h-[480px] lg:h-[640px]",
  labelBefore = "Antes",
  labelAfter = "Depois",
  hint = true,
  frameClass = "rounded-2xl border border-white/[0.09]",
}: {
  hClass?: string;
  labelBefore?: string;
  labelAfter?: string;
  hint?: boolean;
  frameClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const [pos, setPos] = useState(58);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const draggingRef = useRef(false);
  const interactedRef = useRef(false);
  const introRef = useRef<{ stop: () => void } | null>(null);

  // Gentle hint animation the first time the slider enters the viewport
  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => {
      if (interactedRef.current) return;
      const controls = animate(58, [44, 66, 56], {
        duration: 2.4,
        ease: "easeInOut",
        onUpdate: (v) => setPos(v as number),
      });
      introRef.current = controls;
    }, 450);
    return () => {
      window.clearTimeout(id);
      introRef.current?.stop();
    };
  }, [inView]);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(94, Math.max(6, pct)));
  };

  const markInteracted = () => {
    interactedRef.current = true;
    setTouched(true);
    introRef.current?.stop();
  };

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label="Comparação da pintura antes e depois da correção"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      onPointerDown={(e) => {
        draggingRef.current = true;
        setDragging(true);
        markInteracted();
        ref.current?.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => {
        if (draggingRef.current) update(e.clientX);
      }}
      onPointerUp={() => {
        draggingRef.current = false;
        setDragging(false);
      }}
      onPointerCancel={() => {
        draggingRef.current = false;
        setDragging(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          markInteracted();
          setPos((p) => Math.max(6, p - 5));
        }
        if (e.key === "ArrowRight") {
          markInteracted();
          setPos((p) => Math.min(94, p + 5));
        }
      }}
      className={cn(
        "group relative cursor-ew-resize touch-none select-none overflow-hidden bg-ink-2",
        hClass,
        frameClass
      )}
    >
      {/* DEPOIS — corrected & coated paint (base layer) */}
      <img
        src="/img/paint-macro.jpg"
        alt="Pintura após polimento técnico e vitrificação, com reflexo profundo e gotas de água"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover saturate-[1.18] contrast-[1.08]"
      />

      {/* ANTES — swirled, oxidized paint (clipped layer) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src="/img/paint-macro.jpg"
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-[0.9] contrast-[0.8] saturate-[0.22]"
        />
        {/* haze of oxidation */}
        <div className="pointer-events-none absolute inset-0 bg-white/[0.05]" aria-hidden />
        {/* wash swirl marks */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-screen"
          aria-hidden
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 27% 38%, rgba(255,255,255,.55) 0px, rgba(255,255,255,.55) 1px, transparent 1px, transparent 8px), repeating-radial-gradient(circle at 74% 63%, rgba(255,255,255,.4) 0px, rgba(255,255,255,.4) 1px, transparent 1px, transparent 12px)",
          }}
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.26em] text-bone/85 backdrop-blur-sm">
        {labelBefore}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-lime/30 bg-black/45 px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.26em] text-lime backdrop-blur-sm">
        {labelAfter}
      </span>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden>
        <div className="absolute inset-y-0 left-0 w-px -translate-x-1/2 bg-white/85 shadow-[0_0_14px_rgba(0,0,0,0.65)]" />
        <div
          className={cn(
            "absolute left-0 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border backdrop-blur-md transition-colors duration-300",
            dragging
              ? "border-lime bg-black/60 text-lime"
              : "border-white/40 bg-black/45 text-bone group-hover:border-white/70"
          )}
        >
          <ChevronsLeftRight className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </div>
      </div>

      {/* Hint */}
      {hint && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: touched ? 0 : 1 }}
          transition={{ delay: touched ? 0 : 1.4, duration: 0.6 }}
          className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/55 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.26em] text-bone/70 backdrop-blur-sm"
          aria-hidden
        >
          Arraste o divisor
        </motion.span>
      )}
    </div>
  );
}
