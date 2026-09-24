import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GRID_LAYOUT, PROJECTS, getProject, type Project } from "../data/projects";
import { Container, EASE, It, Label, MLine, Reveal } from "./ui";
import { FLIP_TRANSITION, projImgId } from "./cases/ProjectHero";
import { cn } from "../utils/cn";

/** Preload only the essentials of a project (hero + first gallery shot). */
function preloadProject(slug: string) {
  const p = getProject(slug);
  if (!p) return;
  [p.heroImage, p.gallery[0]?.img].forEach((src) => {
    if (!src) return;
    const im = new Image();
    im.src = src;
  });
}

function Fig({
  project,
  layout,
  index,
  onOpen,
}: {
  project: Project;
  layout: (typeof GRID_LAYOUT)[number];
  index: number;
  onOpen: (slug: string, el: HTMLElement) => void;
}) {
  return (
    <motion.figure
      initial={{ clipPath: "inset(12% 5% 12% 5% round 12px)", opacity: 0.35 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.15, ease: EASE, delay: (index % 2) * 0.08 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/[0.08] bg-ink-2 transition-colors duration-500 hover:border-white/[0.16]",
        layout.span
      )}
    >
      <a
        href={`#/projetos/${project.slug}`}
        onClick={(e) => {
          e.preventDefault();
          onOpen(project.slug, e.currentTarget);
        }}
        onMouseEnter={() => preloadProject(project.slug)}
        onFocus={() => preloadProject(project.slug)}
        onTouchStart={() => preloadProject(project.slug)}
        className="block cursor-pointer"
        aria-label={`Abrir case ${project.vehicle} — ${project.serviceLabel}`}
      >
        <div className={cn("relative w-full overflow-hidden", layout.h)}>
          {/* Shared element — flies to the viewer hero on open */}
          <motion.div
            layoutId={projImgId(project.slug)}
            transition={FLIP_TRANSITION}
            style={{ borderRadius: 12 }}
            className="h-full w-full overflow-hidden"
          >
            <img
              src={project.thumb.img}
              alt={project.thumb.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/15" />
          <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.28em] text-white/55">
            {project.id}
          </span>

          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-bone/60">{project.serviceLabel}</p>
              <h3 className="mt-2 font-display text-[17px] font-semibold uppercase tracking-[0.02em] text-bone transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-[19px]">
                {project.vehicle}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.2em] text-bone/50">{project.year}</span>
              <span className="hidden h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/35 text-bone opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 md:grid">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </div>
          </figcaption>
        </div>
      </a>
    </motion.figure>
  );
}

export default function Gallery({ onOpen }: { onOpen: (slug: string, el: HTMLElement) => void }) {
  return (
    <section id="projetos" className="border-t border-white/[0.06] py-24 md:py-36 lg:py-44">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Label>05 · Projetos</Label>
            </Reveal>
            <h2 className="mt-7 font-display font-semibold leading-[1.0] tracking-[-0.03em] text-[clamp(2.1rem,4.8vw,4rem)]">
              <MLine delay={0.06}>Alguns carros</MLine>
              <MLine delay={0.15}>
                <span>
                  falam por <It>si.</It>
                </span>
              </MLine>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.18}>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mute lg:text-right">
                Seleção 2024 — 2026 · (06)
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-12 md:gap-6">
          {PROJECTS.map((project, i) => (
            <Fig key={project.slug} project={project} layout={GRID_LAYOUT[i]} index={i} onOpen={onOpen} />
          ))}
        </div>
      </Container>
    </section>
  );
}
