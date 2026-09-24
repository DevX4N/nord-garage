import { Container, It, Label, MLine, Reveal } from "./ui";
import { cn } from "../utils/cn";

const QUOTES = [
  {
    text: "Peguei o carro e parecia que estava vendo a pintura pela primeira vez.",
    name: "Rafael Martins",
    meta: "BMW 330i — Vitrificação + polimento",
    initials: "RM",
  },
  {
    text: "Acabamento impecável. O nível de cuidado realmente é outro — do agendamento à entrega.",
    name: "Gustavo Almeida",
    meta: "Porsche Macan — Correção de pintura",
    initials: "GA",
  },
];

function Quote({
  q,
  big,
  className,
  delay = 0,
}: {
  q: (typeof QUOTES)[number];
  big?: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <figure>
        <blockquote
          className={cn(
            "font-display font-medium leading-[1.28] tracking-[-0.015em] text-bone",
            big ? "text-[clamp(1.6rem,2.7vw,2.15rem)]" : "text-[clamp(1.25rem,1.9vw,1.5rem)]"
          )}
        >
          <span aria-hidden className="it mr-1.5 text-[1.2em] text-lime">
            “
          </span>
          {q.text}
          <span aria-hidden className="ml-0.5">
            ”
          </span>
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.12] bg-ink-3 font-mono text-[10.5px] tracking-[0.12em] text-metal">
            {q.initials}
          </span>
          <span>
            <span className="block text-[14px] font-semibold text-bone">{q.name}</span>
            <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.2em] text-mute">{q.meta}</span>
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export default function Testimonials() {
  return (
    <section className="border-y border-white/[0.06] bg-ink-2/50 py-24 md:py-36 lg:py-44">
      <Container>
        <Reveal>
          <Label>08 · Vozes</Label>
        </Reveal>
        <h2 className="mt-7 max-w-[700px] font-display font-semibold leading-[1.0] tracking-[-0.03em] text-[clamp(2.1rem,4.8vw,4rem)]">
          <MLine delay={0.06}>Quem gosta de carro</MLine>
          <MLine delay={0.15}>
            <span>
              percebe a <It>diferença.</It>
            </span>
          </MLine>
        </h2>

        <div className="mt-14 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-10">
          <Quote q={QUOTES[0]} big className="md:col-span-7" delay={0.08} />
          <Quote
            q={QUOTES[1]}
            className="md:col-span-5 md:mt-20 md:border-l md:border-white/[0.09] md:pl-12"
            delay={0.18}
          />
        </div>
      </Container>
    </section>
  );
}
