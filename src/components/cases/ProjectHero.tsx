import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Project } from "../../data/projects";
import { Container, MLine, Reveal } from "../ui";
import { cn } from "../../utils/cn";

/** FLIP shared-element settings (card → case → card) */
export const FLIP_TRANSITION: {
  duration: number;
  ease: [number, number, number, number];
} = {
  duration: 0.85,
  ease: [0.76, 0, 0.24, 1],
};

export const projImgId = (slug: string) => `proj-img-${slug}`;

function BackBar({
  project,
  onBack,
  className,
}: {
  project: Project;
  onBack: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      className={cn("flex items-center justify-between", className)}
    >
      <button
        type="button"
        onClick={onBack}
        className="group inline-flex cursor-pointer items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.26em] text-metal transition-colors hover:text-bone"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2} />
        Todos os projetos
      </button>
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.26em] text-mute sm:block">
        Nord Garage — Case {project.id}/06
      </span>
    </motion.div>
  );
}

function TitleBlock({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={className}>
      <Reveal delay={0.45}>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-metal">
          <span className="h-px w-8 bg-lime" aria-hidden />
          Nord / Project {project.id}
        </div>
      </Reveal>
      <h1 className="mt-6 font-display font-semibold leading-[0.96] tracking-[-0.04em] text-bone text-[clamp(2.6rem,6.8vw,6rem)]">
        <MLine delay={0.5}>{project.titleLines[0]}</MLine>
        <MLine delay={0.6}>{project.titleLines[1]}</MLine>
      </h1>
      <Reveal delay={0.75}>
        <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.24em] text-lime/90">
          {project.serviceLabel}
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-mute">
          {project.year} · {project.location} · {project.duration}
        </p>
      </Reveal>
    </div>
  );
}

/** Fine technical rows used by split / concept heroes */
function HeroLines({
  title,
  rows,
  className,
}: {
  title: string;
  rows: { n: string; t: string; tag?: string }[];
  className?: string;
}) {
  return (
    <Reveal delay={0.9} className={className}>
      <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-lime/80">{title}</p>
      <ul className="mt-4">
        {rows.map((r) => (
          <li
            key={r.n}
            className="flex items-baseline justify-between gap-6 border-t border-white/[0.09] py-3 font-mono text-[10px] uppercase tracking-[0.22em] last:border-b"
          >
            <span className="flex items-baseline gap-3">
              <span className="text-mute">{r.n}</span>
              <span className="text-bone/85">{r.t}</span>
            </span>
            {r.tag && <span className="text-mute">{r.tag}</span>}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function SharedImg({
  project,
  radius,
  className,
  style,
  link = true,
}: {
  project: Project;
  radius: number;
  className?: string;
  style?: CSSProperties;
  link?: boolean;
}) {
  return (
    <motion.div
      layoutId={link ? projImgId(project.slug) : undefined}
      transition={FLIP_TRANSITION}
      style={{ borderRadius: radius, ...style }}
      className={cn("overflow-hidden", className)}
    >
      <img
        src={project.heroImage}
        alt={project.thumb.alt}
        style={{ objectPosition: project.heroPos }}
        className="h-full w-full object-cover"
        decoding="async"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

function M3Coverage({ className }: { className?: string }) {
  return (
    <HeroLines
      title="PPF Coverage"
      className={className}
      rows={[
        { n: "01", t: "Capô", tag: "PPF" },
        { n: "02", t: "Para-choque", tag: "PPF" },
        { n: "03", t: "Paralamas", tag: "PPF" },
        { n: "04", t: "Retrovisores", tag: "PPF" },
      ]}
    />
  );
}

function MacanTech({ className }: { className?: string }) {
  return (
    <HeroLines
      title="Paint correction focus"
      className={className}
      rows={[
        { n: "01", t: "Micro scratches" },
        { n: "02", t: "Swirl marks" },
        { n: "03", t: "Paint depth" },
        { n: "04", t: "Final refinement" },
      ]}
    />
  );
}

export default function ProjectHero({
  project,
  onBack,
  flip = true,
}: {
  project: Project;
  onBack: () => void;
  flip?: boolean;
}) {
  const extras =
    project.slug === "bmw-m3" ? (
      <M3Coverage className="mt-10 max-w-[420px]" />
    ) : project.heroVariant === "concept" ? (
      <MacanTech className="mt-10 max-w-[420px]" />
    ) : null;

  /* FULL-BLEED — horizontal photography (911 / RS3) */
  if (project.heroVariant === "full") {
    return (
      <section className="relative min-h-[100svh] overflow-hidden">
        <SharedImg project={project} radius={0} className="absolute inset-0" link={flip} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/20" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" aria-hidden />

        <Container className="absolute inset-x-0 top-0 mx-auto pt-[92px] lg:pt-[104px]">
          <BackBar project={project} onBack={onBack} />
        </Container>
        <Container className="absolute inset-x-0 bottom-0 mx-auto pb-12 md:pb-16">
          <TitleBlock project={project} />
        </Container>
      </section>
    );
  }

  /* PANO — ultra-wide band + negative space (Mustang) */
  if (project.heroVariant === "pano") {
    return (
      <section className="flex min-h-[100svh] flex-col overflow-hidden">
        <Container className="pt-[92px] lg:pt-[100px]">
          <BackBar project={project} onBack={onBack} />
        </Container>
        <div className="relative mt-8 h-[50svh] w-full lg:mt-10 lg:h-[58svh]">
          <SharedImg project={project} radius={0} className="absolute inset-0" link={flip} />
        </div>
        <Container className="flex flex-1 items-center py-12 lg:py-0">
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <TitleBlock project={project} />
            <Reveal delay={0.85} className="shrink-0">
              <p className="max-w-[240px] font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-mute lg:text-right">
                Detalhamento completo com acabamento de curadoria — exterior, interior e presença.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    );
  }

  /* SPLIT / CONCEPT — vertical photography, campaign composition */
  const isConcept = project.heroVariant === "concept";
  const imgRight = project.heroSide === "right";

  return (
    <section className="flex min-h-[100svh] flex-col overflow-hidden lg:grid lg:grid-cols-12">
      {/* Image panel */}
      <div
        className={cn(
          "relative h-[64svh] w-full overflow-hidden lg:h-auto",
          isConcept ? "lg:col-span-5" : "lg:col-span-7",
          imgRight ? "lg:order-2" : "lg:order-1"
        )}
      >
        <SharedImg project={project} radius={0} className="absolute inset-0 h-full" link={flip} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent lg:hidden" aria-hidden />
      </div>

      {/* Content panel */}
      <div
        className={cn(
          "flex flex-1 flex-col justify-between px-5 sm:px-8 lg:px-12",
          isConcept ? "lg:col-span-7" : "lg:col-span-5",
          imgRight ? "lg:order-1 lg:border-r" : "lg:order-2 lg:border-l",
          "border-white/[0.07]"
        )}
      >
        <BackBar project={project} onBack={onBack} className="pt-8 lg:pt-[104px]" />
        <div className="py-14 lg:py-0">
          <TitleBlock project={project} />
          {extras}
        </div>
        <Reveal delay={1} className="hidden pb-16 lg:block">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mute">{project.theme}</p>
        </Reveal>
      </div>
    </section>
  );
}
