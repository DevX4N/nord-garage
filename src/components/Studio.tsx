import { Chip, Container, Counter, It, Label, MLine, ParallaxImg, Reveal } from "./ui";

const STATS = [
  { v: 350, prefix: "+", label: "Veículos atendidos" },
  { v: 4.9, dec: 1, suffix: "/5", label: "Avaliação média" },
  { v: 100, suffix: "%", label: "Atendimento agendado" },
  { v: 5, suffix: " anos", label: "De experiência" },
];

export default function Studio() {
  return (
    <section id="studio" className="border-t border-white/[0.06] py-24 md:py-36 lg:py-44">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Copy + stats */}
          <div className="lg:col-span-5">
            <Reveal>
              <Label>06 · O Studio</Label>
            </Reveal>
            <h2 className="mt-7 font-display font-semibold leading-[1.02] tracking-[-0.03em] text-[clamp(2.1rem,4.8vw,4rem)]">
              <MLine delay={0.06}>Seu carro entra.</MLine>
              <MLine delay={0.15}>
                <span>
                  Outra <It>versão</It> sai.
                </span>
              </MLine>
            </h2>
            <Reveal delay={0.22}>
              <p className="mt-7 max-w-[440px] text-[14.5px] leading-relaxed text-mute md:text-[15.5px]">
                Cada veículo é tratado individualmente. Trabalhamos com agenda controlada para garantir tempo, precisão
                e atenção em cada etapa do processo.
              </p>
            </Reveal>
            <Reveal delay={0.26} className="mt-8 flex flex-wrap gap-2.5">
              <Chip>Agenda controlada</Chip>
              <Chip>Box dedicado</Chip>
              <Chip>Luz técnica</Chip>
            </Reveal>

            <Reveal delay={0.12} y={32} className="mt-12">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08]">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-[#0B0D10] p-6 md:p-7">
                    <div className="font-display text-[30px] font-semibold tracking-[-0.02em] text-bone md:text-[38px]">
                      {s.prefix}
                      <Counter value={s.v} decimals={s.dec ?? 0} />
                      {s.suffix && (
                        <span className="ml-1 text-[0.5em] font-medium tracking-normal text-mute">{s.suffix}</span>
                      )}
                    </div>
                    <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-mute md:text-[9.5px]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.2em] text-mute/70">
                Números do studio — 2021 até hoje
              </p>
            </Reveal>
          </div>

          {/* Studio visual */}
          <div className="lg:col-span-7">
            <Reveal y={44} className="h-full">
              <ParallaxImg
                src="/img/studio.jpg"
                alt="Interior do estúdio Nord Garage: carro sob luzes lineares de LED, piso polido e parede de ferramentas organizada"
                speed={22}
                className="h-[320px] rounded-xl border border-white/[0.08] sm:h-[420px] lg:h-full lg:min-h-[560px]"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.28em] text-white/55">06</span>
                <div className="absolute bottom-4 left-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/85">
                  <span className="h-[6px] w-[6px] rounded-full bg-lime" aria-hidden />
                  Box 02 — iluminação técnica 6500K
                </div>
              </ParallaxImg>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
