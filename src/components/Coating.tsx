import { ArrowRight } from "lucide-react";
import { CTA, Chip, Container, It, Label, MLine, ParallaxImg, Reveal } from "./ui";

const BENEFITS = [
  {
    t: "Até 3 anos de proteção*",
    d: "Camada cerâmica de alta durabilidade sobre o verniz.",
  },
  {
    t: "Efeito hidrofóbico",
    d: "Água e sujeira deslizam. Lavagens mais rápidas e seguras.",
  },
  {
    t: "Maior profundidade de brilho",
    d: "Realça a cor e o reflexo, com acabamento espelhado.",
  },
  {
    t: "Facilidade de manutenção",
    d: "Menos contaminantes aderidos no dia a dia.",
  },
  {
    t: "Proteção contra contaminantes",
    d: "Barreira contra seiva, chuva ácida, fezes de ave e raios UV.",
  },
];

export default function Coating() {
  return (
    <section id="vitrificacao" className="border-y border-white/[0.06] bg-ink-2/50 py-24 md:py-36 lg:py-44">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Copy + benefits */}
          <div className="lg:col-span-6">
            <Reveal>
              <Label>03 · Vitrificação</Label>
            </Reveal>
            <h2 className="mt-7 font-display font-semibold leading-[1.02] tracking-[-0.03em] text-[clamp(2.1rem,4.8vw,4rem)]">
              <MLine delay={0.06}>Brilho que fica.</MLine>
              <MLine delay={0.15}>
                <span>
                  Proteção que <It>trabalha.</It>
                </span>
              </MLine>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-[480px] text-[14.5px] leading-relaxed text-mute md:text-[15.5px]">
                A proteção cerâmica cria uma camada resistente sobre o verniz, facilitando a manutenção e preservando o
                acabamento do veículo por muito mais tempo.
              </p>
            </Reveal>
            <Reveal delay={0.26} className="mt-8 flex flex-wrap gap-2.5">
              <Chip>SiO₂</Chip>
              <Chip>Dureza 9H</Chip>
              <Chip>UV Block</Chip>
              <Chip>Hydrophobic</Chip>
            </Reveal>

            <div className="mt-12">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.t} delay={i * 0.05} y={16}>
                  <div className="grid gap-1.5 border-t border-white/[0.08] py-5 last:border-b sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-8">
                    <div className="flex items-baseline gap-3.5">
                      <span className="h-[5px] w-[5px] shrink-0 translate-y-[-2px] bg-lime/90" aria-hidden />
                      <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-bone">{b.t}</h3>
                    </div>
                    <p className="pl-[22px] text-[13.5px] leading-relaxed text-mute sm:pl-0">{b.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-mute/80">
                *Durabilidade variável conforme produto e manutenção.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-7">
                <CTA href="#contato">Quero proteger meu carro</CTA>
                <a
                  href="#processo"
                  className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-metal transition-colors hover:text-lime"
                >
                  Ver como aplicamos
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Visual */}
          <div className="lg:col-span-6">
            <Reveal y={44} className="h-full">
              <ParallaxImg
                src="/img/paint-macro.jpg"
                alt="Gotas de água perfeitas sobre pintura preta vitrificada, sob reflexo de luz linear"
                speed={24}
                className="h-[360px] rounded-xl border border-white/[0.09] sm:h-[440px] lg:h-full lg:min-h-[580px]"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/85">
                  <span className="h-[6px] w-[6px] rounded-full bg-lime" aria-hidden />
                  Beading real · sem filtro
                </div>
                <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.28em] text-white/50">03</span>
              </ParallaxImg>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
