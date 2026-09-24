import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CTA, Container, EASE, It, MLine } from "./ui";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Cinematic backdrop */}
      <motion.div style={{ y: imgY }} className="absolute inset-0" aria-hidden>
        <motion.img
          src="/img/hero.jpg"
          alt=""
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/10 to-transparent" aria-hidden />

      {/* Content */}
      <motion.div style={{ opacity: fade }} className="relative z-10">
        <Container className="pt-[150px] md:pt-[170px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-metal"
          >
            <span className="h-px w-8 bg-lime" aria-hidden />
            Automotive Detailing Studio
          </motion.div>

          <h1 className="mt-8 font-display font-semibold leading-[0.98] tracking-[-0.04em] text-bone text-[clamp(2.75rem,7.6vw,6.7rem)]">
            <MLine delay={0.45}>Seu carro merece</MLine>
            <MLine delay={0.56}>mais do que uma</MLine>
            <MLine delay={0.67}>
              <It>lavagem.</It>
            </MLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="mt-7 max-w-[430px] text-[15px] leading-relaxed text-metal md:text-base"
          >
            Detalhamento automotivo, proteção e acabamento
            para quem percebe cada detalhe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.02 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <CTA href="#contato">Solicitar orçamento</CTA>
            <CTA href="#servicos" variant="ghost" className="bg-ink/40 backdrop-blur-sm">
              Conhecer serviços
            </CTA>
          </motion.div>
        </Container>

        {/* Bottom info bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.25 }}
          className="mt-14 border-t border-white/10 md:mt-[76px]"
        >
          <Container>
            <div className="grid grid-cols-2 gap-y-4 py-5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-mute md:grid-cols-4 md:text-[10px]">
              <span>Atendimento com hora marcada</span>
              <span className="text-right md:text-center">Seg — Sáb / 08:00 — 18:00</span>
              <span className="md:text-center">Curitiba — PR</span>
              <span className="flex items-center gap-3 md:justify-end">
                Role
                <span className="relative h-6 w-px overflow-hidden bg-white/15" aria-hidden>
                  <motion.span
                    className="absolute left-0 top-0 h-2.5 w-px bg-lime"
                    animate={{ y: [-10, 26] }}
                    transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                  />
                </span>
              </span>
            </div>
          </Container>
        </motion.div>
      </motion.div>
    </section>
  );
}
