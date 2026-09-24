import { MessageCircle } from "lucide-react";
import { CTA, Container, It, MLine, ParallaxImg, Reveal } from "./ui";

const WA_LINK =
  "https://wa.me/5541999999999?text=Ol%C3%A1!%20Quero%20solicitar%20um%20or%C3%A7amento%20na%20Nord%20Garage.";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <ParallaxImg
        src="/img/final.jpg"
        alt="Aerofólio traseiro de um carro preto iluminado por uma luz linear do estúdio"
        speed={30}
        className="absolute inset-0"
        imgClassName="brightness-[0.62] saturate-[0.92]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" aria-hidden />

      <Container className="relative z-10 flex min-h-[82vh] flex-col items-start justify-center py-28 md:min-h-[92vh]">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/35 px-4 py-2 font-mono text-[9.5px] uppercase tracking-[0.24em] text-metal backdrop-blur-sm">
            <span className="relative flex h-[7px] w-[7px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime/70" aria-hidden />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-lime" aria-hidden />
            </span>
            Agenda aberta — Curitiba, PR
          </span>
        </Reveal>

        <h2 className="mt-9 font-display font-semibold leading-[0.98] tracking-[-0.04em] text-[clamp(2.6rem,6.8vw,5.8rem)]">
          <MLine delay={0.08}>O próximo detalhe</MLine>
          <MLine delay={0.18}>
            <span>
              é o <It>seu.</It>
            </span>
          </MLine>
        </h2>

        <Reveal delay={0.24}>
          <p className="mt-7 max-w-[430px] text-[15px] leading-relaxed text-metal md:text-base">
            Agende uma avaliação e descubra o tratamento ideal para o seu veículo — sem compromisso.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-11 flex flex-wrap items-center gap-4">
          <CTA href="#contato" className="h-[58px] px-9 text-[15px]">
            Solicitar orçamento
          </CTA>
          <CTA
            href={WA_LINK}
            variant="ghost"
            className="h-[58px] bg-ink/40 px-8 backdrop-blur-sm"
            icon={<MessageCircle className="h-4 w-4" strokeWidth={2.2} />}
          >
            WhatsApp
          </CTA>
        </Reveal>
      </Container>
    </section>
  );
}
