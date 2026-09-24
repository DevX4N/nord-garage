import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container, It, Label, MLine, Reveal } from "./ui";

const STEPS = [
  {
    t: "Inspeção",
    d: "Analisamos o estado do veículo e identificamos as necessidades reais de cada superfície.",
  },
  {
    t: "Preparação",
    d: "Lavagem técnica e descontaminação completa de pintura, vidros, rodas e caixas de roda.",
  },
  {
    t: "Correção",
    d: "Polimento e tratamento das superfícies, etapa por etapa, sem atalhos.",
  },
  {
    t: "Proteção",
    d: "Aplicação das soluções escolhidas: cerâmico, PPF, selantes ou tratamento de couro.",
  },
  {
    t: "Entrega",
    d: "Inspeção final sob luz técnica e orientações de manutenção para o dia a dia.",
  },
];

export default function Process() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 78%", "end 42%"] });
  const rail = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });

  return (
    <section id="processo" className="py-24 md:py-36 lg:py-44">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Label>04 · Processo</Label>
            </Reveal>
            <h2 className="mt-7 font-display font-semibold leading-[1.0] tracking-[-0.03em] text-[clamp(2.1rem,4.8vw,4rem)]">
              <MLine delay={0.06}>Nada é feito</MLine>
              <MLine delay={0.15}>
                <span>
                  no <It>automático.</It>
                </span>
              </MLine>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.18}>
              <p className="max-w-[340px] text-[14.5px] leading-relaxed text-mute lg:ml-auto">
                Cinco etapas, um padrão inegociável — de 1 a 3 dias por veículo, com agenda controlada para que nada
                seja apressado.
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={railRef} className="relative mt-14 md:mt-20">
          {/* Progress rail (desktop) */}
          <div className="absolute left-0 top-0 hidden h-px w-full bg-white/[0.08] md:block" aria-hidden />
          <motion.div
            style={{ scaleX: rail }}
            className="absolute left-0 top-0 hidden h-px w-full origin-left bg-lime md:block"
            aria-hidden
          />

          <ol className="relative md:grid md:grid-cols-5 md:gap-9 md:pt-12">
            {STEPS.map((s, i) => (
              <li
                key={s.t}
                className="relative border-l border-white/[0.09] pb-11 pl-9 last:pb-0 md:border-0 md:pb-0 md:pl-0"
              >
                <span
                  className="absolute -left-[4px] top-[6px] h-[7px] w-[7px] rounded-full bg-lime md:hidden"
                  aria-hidden
                />
                <Reveal delay={i * 0.07} y={22}>
                  <span className="font-mono text-[11px] tracking-[0.3em] text-lime">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-[16px] font-semibold uppercase tracking-[0.14em] text-bone">
                    {s.t}
                  </h3>
                  <p className="mt-3 max-w-[300px] text-[13.5px] leading-relaxed text-mute md:max-w-none">{s.d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
