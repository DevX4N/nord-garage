import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Results from "./components/Results";
import Services from "./components/Services";
import Coating from "./components/Coating";
import Process from "./components/Process";
import Gallery from "./components/Gallery";
import Studio from "./components/Studio";
import Hotspots from "./components/Hotspots";
import Testimonials from "./components/Testimonials";
import Quote from "./components/Quote";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ProjectViewer from "./components/cases/ProjectDetail";
import { getProject } from "./data/projects";

type Route = { view: "home"; section: string | null } | { view: "case"; slug: string };

function parseHash(): Route {
  const h = window.location.hash;
  const m = h.match(/^#\/projetos\/([a-z0-9-]+)/i);
  if (m && getProject(m[1])) return { view: "case", slug: m[1] };
  return { view: "home", section: h && h.length > 1 ? h.slice(1) : null };
}

/**
 * Body scroll lock with scrollbar-width compensation.
 * The viewer is a fixed overlay — the page behind never moves,
 * so closing it lands the user exactly where they were. No scrollTo needed.
 */
let lockCount = 0;
function lockScroll(on: boolean) {
  if (on) {
    lockCount++;
    if (lockCount === 1) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    }
  } else {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }
}

const ANCHOR_OFFSET = 82;

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseHash());

  /** True when the open viewer was launched from a grid entry below it in history. */
  const fromGrid = useRef(false);
  /** Slug of the viewer that arrived via direct URL (FLIP disabled for that first open). */
  const directOpen = useRef<string | null>(route.view === "case" ? route.slug : null);
  /** Card anchor that triggered the viewer — focus returns here on close. */
  const lastFocus = useRef<HTMLElement | null>(null);
  const prevRoute = useRef<Route | null>(null);

  /* Hash router */
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    const on = () => setRoute(parseHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET,
        behavior: "instant" as ScrollBehavior,
      });
    }
  }, []);

  /* Close the viewer:
     - opened from the grid  → history.back() pops exactly the entry we pushed (nothing unexpected)
     - opened via direct URL → replaceState strips the hash without leaving the site */
  const closeViewer = useCallback(() => {
    if (fromGrid.current) {
      window.history.back();
    } else {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      setRoute({ view: "home", section: null });
    }
  }, []);

  /* While the viewer is open: body locked, Esc closes (desktop) */
  useEffect(() => {
    if (route.view !== "case") return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [route.view, closeViewer]);

  /* Post-close bookkeeping: flags, focus return, explicit section targets */
  useEffect(() => {
    const prev = prevRoute.current;
    prevRoute.current = route;
    if (route.view !== "home") return;

    const wasCase = prev?.view === "case";
    fromGrid.current = false;

    if (wasCase) {
      directOpen.current = null;
      lastFocus.current?.focus({ preventScroll: true });
      lastFocus.current = null;
      if (route.section && !["", "top", "projetos"].includes(route.section)) {
        const s = route.section;
        window.setTimeout(() => scrollToSection(s), 360);
      }
      return;
    }

    // Initial load with a section hash — the element doesn't exist before React mounts.
    if (prev === null && route.section && !["", "top"].includes(route.section)) {
      const s = route.section;
      window.setTimeout(() => scrollToSection(s), 120);
    }
    // Plain in-page anchors: native smooth scrolling handles them.
  }, [route, scrollToSection]);

  /* Open from a card: push one history entry (so Back closes the viewer first) */
  const handleOpen = useCallback((slug: string, el: HTMLElement) => {
    fromGrid.current = true;
    lastFocus.current = el;
    window.location.hash = `#/projetos/${slug}`;
  }, []);

  /* Prev/Next inside the viewer: replace the entry — never stacks depth */
  const navInViewer = useCallback((slug: string) => {
    window.location.replace(`#/projetos/${slug}`);
  }, []);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="nord-projects">
        <div className="relative min-h-screen bg-ink font-body text-bone">
          <motion.div
            style={{ scaleX: progress }}
            className="fixed inset-x-0 top-0 z-[85] h-[2px] origin-left bg-lime/70"
            aria-hidden
          />
          <div className="grain" aria-hidden />

          <Header />

          {/* The site never unmounts — the grid keeps its exact scroll position
              behind the fullscreen project viewer. */}
          <main>
            <Hero />
            <Results />
            <Services />
            <Coating />
            <Process />
            <Gallery onOpen={handleOpen} />
            <Studio />
            <Hotspots />
            <Testimonials />
            <Quote />
            <FinalCTA />
            <Footer />
          </main>

          <AnimatePresence>
            {route.view === "case" && (
              <ProjectViewer
                key="viewer"
                slug={route.slug}
                noFlip={directOpen.current !== null}
                onClose={closeViewer}
                onNav={navInViewer}
              />
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
