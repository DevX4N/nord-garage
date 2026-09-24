import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container, EASE } from "./ui";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Resultados", href: "#resultados" },
  { label: "Processo", href: "#processo" },
  { label: "Studio", href: "#studio" },
  { label: "Contato", href: "#contato" },
];

function Wordmark() {
  return (
    <span className="block leading-none">
      <span className="font-display text-[16px] font-bold tracking-[-0.01em]">
        NORD<span className="text-lime">.</span>GARAGE
      </span>
      <span className="mt-[5px] block font-mono text-[7.5px] uppercase tracking-[0.34em] text-mute">
        Automotive Detailing Studio
      </span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[75] transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-white/[0.07] bg-ink/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container className="flex h-[72px] items-center justify-between md:h-[80px]">
          <a href="#top" aria-label="Nord Garage — voltar ao início">
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Navegação principal">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative py-2 text-[13px] font-medium text-metal transition-colors duration-300 hover:text-bone"
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-lime transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="group hidden h-10 items-center gap-2 rounded-[4px] bg-lime px-5 text-[13px] font-semibold text-[#0B0C08] transition-colors duration-300 hover:bg-[#E6FF70] lg:inline-flex"
            >
              Solicitar orçamento
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                strokeWidth={2.4}
              />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-[4px] border border-white/15 text-bone transition-colors hover:border-lime/50 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[80] flex flex-col bg-[#07080A] lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-[4px] border border-white/15 text-bone"
                aria-label="Fechar menu"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-7" aria-label="Menu móvel">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.7, ease: EASE }}
                  className="group flex items-baseline gap-4 border-b border-white/[0.07] py-5"
                >
                  <span className="font-mono text-[10px] tracking-[0.25em] text-lime">0{i + 1}</span>
                  <span className="font-display text-[30px] font-semibold tracking-[-0.02em] text-bone transition-colors group-active:text-lime">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.7, ease: EASE }}
              className="px-7 pb-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                Seg — Sáb / 08:00 — 18:00 &nbsp;·&nbsp; Curitiba — PR
              </p>
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="mt-5 flex h-[52px] items-center justify-center gap-2 rounded-[4px] bg-lime text-[14px] font-semibold text-[#0C0D09]"
              >
                Solicitar orçamento
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
