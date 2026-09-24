import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getNextProject, getPrevProject, type Project } from "../../data/projects";
import { Container, EASE, Label, Reveal } from "../ui";
import { cn } from "../../utils/cn";

/* -------------------------------- GALLERY ---------------------------------- */

function CaseFig({ fig, index }: { fig: Project["gallery"][number]; index: number }) {
  return (
    <motion.figure
      initial={{ clipPath: "inset(10% 4% 10% 4% round 12px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.05, ease: EASE, delay: (index % 2) * 0.06 }}
      className={cn("group relative overflow-hidden rounded-xl border border-white/[0.08] bg-ink-2", fig.span)}
    >
      <div className={cn("relative w-full overflow-hidden", fig.h)}>
        <img
          src={fig.img}
          alt={fig.alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(event) => {
            if (!fig.fallback || event.currentTarget.dataset.fallback === "true") return;
            event.currentTarget.dataset.fallback = "true";
            event.currentTarget.src = fig.fallback;
          }}
          style={fig.pos ? { objectPosition: fig.pos } : undefined}
          className={cn(
            "h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]",
            fig.zoom,
            fig.tone
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10" />
        <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.28em] text-white/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <figcaption className="absolute bottom-4 left-4 font-mono text-[9.5px] uppercase tracking-[0.24em] text-bone/75">
          {fig.cap}
        </figcaption>
      </div>
    </motion.figure>
  );
}

export function CaseGallery({ project }: { project: Project }) {
  return (
    <section className="border-t border-white/[0.06] py-24 md:py-32">
      <Container>
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <Label>{project.galleryLabel}</Label>
            </Reveal>
          </div>
          <div className="md:col-span-4">
            <Reveal delay={0.12}>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-mute md:text-right">
                ({String(project.gallery.length).padStart(2, "0")}) fotografias
              </p>
            </Reveal>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-12 md:gap-6">
          {project.gallery.map((fig, i) => (
            <CaseFig key={fig.cap + i} fig={fig} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------- NEXT PROJECT ------------------------------ */

export function NextProject({
  project,
  onOpenNext,
  onOpenPrev,
}: {
  project: Project;
  onOpenNext: (slug: string) => void;
  onOpenPrev: (slug: string) => void;
}) {
  const next = getNextProject(project.slug);
  const prev = getPrevProject(project.slug);
  return (
    <section className="border-t border-white/[0.07] py-16 md:py-20">
      <Container>
        <Reveal>
          <div className="flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.26em] text-mute">
            <span>Next project</span>
            <span className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => onOpenPrev(prev.slug)}
                aria-label={`Projeto anterior: ${prev.vehicle}`}
                className="group inline-flex cursor-pointer items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-mute transition-colors hover:text-bone"
              >
                <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={2} />
                <span className="hidden sm:inline">{prev.vehicle}</span>
                <span className="sm:hidden">Anterior</span>
              </button>
              <span>
                {next.id} — {next.year}
              </span>
            </span>
          </div>
        </Reveal>

        <Reveal y={36} className="mt-8">
          <a
            href={`#/projetos/${next.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onOpenNext(next.slug);
            }}
            className="group block"
            aria-label={`Abrir próximo projeto: ${next.vehicle}`}
          >
            <div className="relative overflow-hidden rounded-xl border border-white/[0.08]">
              <img
                src={next.heroImage}
                alt={next.thumb.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: next.heroPos }}
                className="h-[280px] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] sm:h-[340px] lg:h-[420px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-9">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-lime/90">{next.serviceLabel}</p>
                  <p className="mt-3 font-display font-semibold leading-[1.02] tracking-[-0.03em] text-bone text-[clamp(1.6rem,4vw,3.2rem)] transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                    {next.vehicle}
                  </p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/30 bg-black/40 text-bone backdrop-blur-sm transition-all duration-500 group-hover:border-lime group-hover:bg-lime group-hover:text-[#0C0D09] md:h-14 md:w-14">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" strokeWidth={2} />
                </span>
              </div>
            </div>
          </a>
        </Reveal>

        <div className="mt-14 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-mute/70">
          <span>Nord Garage — Detailing Studio</span>
          <span>Case {project.id}/06</span>
        </div>
      </Container>
    </section>
  );
}
