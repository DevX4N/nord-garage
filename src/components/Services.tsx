import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container, EASE, It, Label, MLine, Reveal } from "./ui";
import { cn } from "../utils/cn";

const SERVICES: {
  n: string;
  t: string;
  d: string;
  tag: string;
  img: string;
  alt: string;
  imgCls?: string;
}[] = [
  {
    n: "01",
    t: "Polimento Técnico",
    d: "Correção de micro riscos, hologramas e imperfeições da pintura.",
    tag: "Correção",
    img: "/img/svc-polimento.jpg",
    alt: "Detailer polindo pintura preta com politriz em estúdio escuro",
  },
  {
    n: "02",
    t: "Vitrificação",
    d: "Proteção cerâmica de alta durabilidade, brilho profundo e efeito hidrofóbico.",
    tag: "Cerâmica",
    img: "/img/svc-vitrificacao.jpg",
    alt: "Aplicação de coating cerâmico em capô preto",
  },
  {
    n: "03",
    t: "PPF",
    d: "Película de proteção para áreas de maior impacto e desgaste.",
    tag: "Película",
    img: "/img/svc-ppf.jpg",
    alt: "Aplicação de película PPF no para-choque dianteiro",
  },
  {
    n: "04",
    t: "Higienização Interna",
    d: "Limpeza técnica de bancos, carpetes, plásticos e acabamentos.",
    tag: "Interior",
    img: "/img/svc-interior.jpg",
    alt: "Higienização detalhada de banco de couro",
  },
  {
    n: "05",
    t: "Proteção de Couro",
    d: "Tratamento e proteção contra desgaste, ressecamento e manchas.",
    tag: "Couro",
    img: "/img/svc-interior.jpg",
    imgCls: "origin-[26%_76%] scale-[2.15] saturate-[0.88] contrast-[1.06]",
    alt: "Macro do couro com costuras após tratamento de proteção",
  },
  {
    n: "06",
    t: "Detalhamento Completo",
    d: "Tratamento interno e externo para recuperar a aparência do veículo.",
    tag: "Full detail",
    img: "/img/hero.jpg",
    alt: "Coupé preto finalizado sob luzes lineares do estúdio",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="servicos" className="border-t border-white/[0.06] py-24 md:py-36 lg:py-44">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Header + sticky preview */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[110px]">
              <Reveal>
                <Label>02 · Serviços</Label>
              </Reveal>
              <h2 className="mt-7 font-display font-semibold leading-[1.02] tracking-[-0.03em] text-[clamp(2.1rem,4.8vw,4rem)]">
                <MLine delay={0.06}>Tratamento completo.</MLine>
                <MLine delay={0.15}>
                  <span>
                    Do verniz ao <It>interior.</It>
                  </span>
                </MLine>
              </h2>
              <Reveal delay={0.22}>
                <p className="mt-7 max-w-[420px] text-[14.5px] leading-relaxed text-mute">
                  Seis frentes de trabalho, um único padrão. Passe por cada serviço para ver o processo de perto.
                </p>
              </Reveal>

              <Reveal delay={0.1} y={40} className="relative mt-12 hidden lg:block">
                <div className="relative aspect-[4/3.15] overflow-hidden rounded-xl border border-white/[0.09] bg-ink-2">
                  {SERVICES.map((s, i) => (
                    <div
                      key={s.n + s.t}
                      className={cn(
                        "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                      )}
                    >
                      <img src={s.img} alt={s.alt} className={cn("h-full w-full object-cover", s.imgCls)} />
                    </div>
                  ))}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.24em]">
                    <span className="text-lime">{SERVICES[active].n}</span>
                    <span className="text-bone/85">{SERVICES[active].tag}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.24em] text-bone/50">
                    {SERVICES[active].n} / 06
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Editorial service list */}
          <div className="lg:col-span-7 lg:pt-2">
            <ul>
              {SERVICES.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.85, ease: EASE, delay: i * 0.05 }}
                  className="border-t border-white/[0.07] last:border-b"
                >
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="group relative flex w-full cursor-pointer items-center gap-5 py-6 text-left sm:gap-8 md:py-8"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-lime/60 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      />
                      <span
                        className={cn(
                          "w-7 shrink-0 font-mono text-[11px] tracking-[0.2em] transition-colors duration-300",
                          i === active ? "text-lime" : "text-mute"
                        )}
                      >
                        {s.n}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block font-display text-[22px] font-semibold tracking-[-0.02em] text-bone transition-transform duration-500 ease-out md:text-[30px]",
                            i === active && "translate-x-1.5 md:translate-x-2"
                          )}
                        >
                          {s.t}
                        </span>
                        <span className="mt-1.5 block max-w-[440px] text-[13.5px] leading-relaxed text-mute">
                          {s.d}
                        </span>
                      </span>
                      <img
                        src={s.img}
                        alt=""
                        className={cn(
                          "h-[64px] w-[64px] shrink-0 rounded-lg border border-white/10 object-cover sm:h-[76px] sm:w-[76px] lg:hidden",
                          s.imgCls
                        )}
                      />
                      <ArrowUpRight
                        className={cn(
                          "hidden h-5 w-5 shrink-0 transition-all duration-300 lg:block",
                          i === active ? "translate-x-0 text-lime opacity-100" : "-translate-x-2 text-mute opacity-0"
                        )}
                        strokeWidth={2}
                      />
                    </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
