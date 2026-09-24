import { useEffect, useLayoutEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { getNextProject, getPrevProject, getProject } from "../../data/projects";
import ProjectHero from "./ProjectHero";
import { FeatureSwitch } from "./features";
import { CaseGallery, NextProject } from "./modules";
import { Container, EASE, Reveal } from "../ui";

/**
 * Fullscreen project viewer.
 * Renders as a fixed overlay above the (never unmounted) site, with its own
 * scroll context. Closing it simply reveals the page exactly where it was.
 *
 * Composition is intentionally lean: hero (identity) → the one unique
 * service moment → editorial gallery → next project.
 */
export default function ProjectViewer({
  slug,
  noFlip,
  onClose,
  onNav,
}: {
  slug: string;
  noFlip: boolean;
  onClose: () => void;
  onNav: (slug: string) => void;
}) {
  const project = getProject(slug);
  const prev = getPrevProject(slug);
  const next = getNextProject(slug);
  const scrollRef = useRef<HTMLDivElement>(null);

  // The viewer has its own scroll — reset it when switching between projects.
  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  useEffect(() => {
    scrollRef.current?.focus({ preventScroll: true });
  }, []);

  if (!project) return null;

  return (
    <motion.div
      ref={scrollRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Case ${project.vehicle} — ${project.serviceLabel}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.28, ease: "easeIn" } }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="fixed inset-0 z-[65] overflow-y-auto overflow-x-hidden overscroll-contain bg-ink outline-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
      >
        <AnimatePresence mode="wait">
          <motion.main
            key={slug}
            initial={false}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
          >
            <ProjectHero project={project} onBack={onClose} flip={!noFlip} />
            <FeatureSwitch project={project} />
            <CaseGallery project={project} />

            {/* Slim conversion line — no extra section */}
            <Container className="border-t border-white/[0.07] py-9">
              <Reveal>
                <a
                  href="#contato"
                  className="group flex flex-wrap items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.26em]"
                >
                  <span className="text-mute">Esse acabamento no seu carro?</span>
                  <span className="inline-flex items-center gap-2.5 text-bone transition-colors group-hover:text-lime">
                    Solicitar orçamento
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
                  </span>
                </a>
              </Reveal>
            </Container>

            <NextProject project={project} onOpenNext={onNav} onOpenPrev={onNav} />
          </motion.main>
        </AnimatePresence>
      </motion.div>

      {/* Prev / Next — fixed side controls (desktop) */}
      <button
        type="button"
        onClick={() => onNav(prev.slug)}
        aria-label={`Projeto anterior: ${prev.vehicle}`}
        className="group fixed left-5 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer items-center gap-0 rounded-full border border-white/15 bg-black/35 p-3 backdrop-blur-md transition-colors hover:border-lime/60 lg:flex"
      >
        <ArrowLeft className="h-4 w-4 text-bone transition-colors group-hover:text-lime" strokeWidth={2} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.22em] text-mute transition-all duration-500 group-hover:ml-2.5 group-hover:max-w-[160px]">
          {prev.vehicle}
        </span>
      </button>
      <button
        type="button"
        onClick={() => onNav(next.slug)}
        aria-label={`Próximo projeto: ${next.vehicle}`}
        className="group fixed right-5 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer items-center gap-0 rounded-full border border-white/15 bg-black/35 p-3 backdrop-blur-md transition-colors hover:border-lime/60 lg:flex"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.22em] text-mute transition-all duration-500 group-hover:mr-2.5 group-hover:max-w-[160px]">
          {next.vehicle}
        </span>
        <ArrowRight className="h-4 w-4 text-bone transition-colors group-hover:text-lime" strokeWidth={2} />
      </button>

      {/* Always-accessible close (mobile) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar projeto"
        className="fixed bottom-5 right-5 z-10 grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/50 text-bone backdrop-blur-md transition-colors active:border-lime/60 lg:hidden"
      >
        <X className="h-[18px] w-[18px]" strokeWidth={2} />
      </button>
    </motion.div>
  );
}
