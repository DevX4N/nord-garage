import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Container, EASE, It, Label, MLine, Reveal } from "./ui";
import { cn } from "../utils/cn";

type Point = { id: string; x: number; y: number; n: string; t: string; d: string };

const POINTS: Point[] = [
  { id: "pintura", x: 62, y: 44, n: "01", t: "Pintura", d: "Correção de verniz seguida de proteção cerâmica ou PPF parcial." },
  { id: "vidros", x: 50, y: 28, n: "02", t: "Vidros", d: "Descontaminação, polimento leve e selante repelente de água." },
  { id: "interior", x: 31, y: 35, n: "03", t: "Interior", d: "Higienização detalhada de couro, plásticos e carpetes." },
  { id: "farois", x: 84, y: 55, n: "04", t: "Faróis", d: "Correção do policarbonato e vedação contra amarelamento." },
  { id: "rodas", x: 44, y: 68, n: "05", t: "Rodas", d: "Limpeza técnica interna e externa, com proteção de alta temperatura." },
  { id: "pneus", x: 39, y: 78, n: "06", t: "Pneus", d: "Condicionamento com acabamento acetinado, sem brilho artificial." },
];

export default function Hotspots() {
  const [active, setActive] = useState<string | null>("pintura");
  const pt = POINTS.find((p) => p.id === active) ?? null;

  return (
    <section id="detalhes" className="border-t border-white/[0.06] py-24 md:py-36 lg:py-44">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Label>07 · Mapeamento</Label>
            </Reveal>
            <h2 className="mt-7 font-display font-semibold leading-[1.0] tracking-[-0.03em] text-[clamp(2.1rem,4.8vw,4rem)]">
              <MLine delay={0.06}>Cada superfície</MLine>
              <MLine delay={0.15}>
                <span>
                  tem um <It>tratamento.</It>
                </span>
              </MLine>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.18}>
              <p className="max-w-[340px] text-[14.5px] leading-relaxed text-mute lg:ml-auto">
                Pintura, vidros, rodas, pneus, faróis e interior: cada zona do veículo tem um protocolo próprio. Toque
                nos pontos para explorar.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal y={44} className="mt-14 md:mt-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.09] bg-ink-2 sm:aspect-auto sm:h-[500px] lg:h-[560px]">
            <img
              src="/img/hero.jpg"
              alt="Coupé preto no estúdio com pontos interativos de tratamento sobre pintura, vidros, rodas, pneus, faróis e interior"
              className="absolute inset-0 h-full w-full object-cover object-[50%_56%]"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/85 to-transparent" aria-hidden />

            <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.24em] text-bone/75 backdrop-blur-sm">
              06 pontos de atenção
            </span>

            {/* Hotspot dots */}
            {POINTS.map((p) => (
              <button
                key={p.id}
                type="button"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onClick={() => setActive((cur) => (cur === p.id ? null : p.id))}
                aria-pressed={active === p.id}
                aria-label={`${p.t} — ${p.d}`}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer p-1.5"
              >
                <span
                  className={cn(
                    "relative grid h-9 w-9 place-items-center rounded-full border backdrop-blur-[2px] transition-all duration-300",
                    active === p.id
                      ? "border-lime bg-black/55"
                      : "dot-ping border-white/35 bg-black/25 group-hover:border-white/70"
                  )}
                >
                  <span
                    className={cn(
                      "h-[7px] w-[7px] rounded-full transition-colors duration-300",
                      active === p.id ? "bg-lime" : "bg-white/85"
                    )}
                  />
                </span>
              </button>
            ))}

            {/* Desktop tooltip */}
            <AnimatePresence mode="wait">
              {pt && (
                <motion.div
                  key={pt.id}
                  initial={{ opacity: 0, y: pt.y > 42 ? 8 : -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: pt.y > 42 ? 8 : -8 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={cn(
                    "pointer-events-none absolute z-20 hidden -translate-x-1/2 md:block",
                    pt.y > 42 ? "-translate-y-[calc(100%+16px)]" : "translate-y-[18px]"
                  )}
                  style={{
                    left: `${Math.min(Math.max(pt.x, 15), 85)}%`,
                    top: `${pt.y}%`,
                  }}
                  aria-hidden
                >
                  <div className="w-[250px] rounded-lg border border-white/[0.12] bg-ink-3/95 p-4 shadow-2xl backdrop-blur">
                    <p className="flex items-baseline gap-2.5 font-mono text-[9.5px] uppercase tracking-[0.24em] text-lime">
                      <span>{pt.n}</span> {pt.t}
                    </p>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-bone/85">{pt.d}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile bottom sheet */}
            <AnimatePresence mode="wait">
              {pt && (
                <motion.div
                  key={"m" + pt.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute inset-x-3 bottom-3 z-20 flex items-start justify-between gap-4 rounded-lg border border-white/[0.12] bg-ink-3/95 p-4 backdrop-blur md:hidden"
                >
                  <div>
                    <p className="flex items-baseline gap-2.5 font-mono text-[9.5px] uppercase tracking-[0.24em] text-lime">
                      <span>{pt.n}</span> {pt.t}
                    </p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-bone/85">{pt.d}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    aria-label="Fechar detalhe"
                    className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full border border-white/15 text-bone/70"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
