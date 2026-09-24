import { ArrowUp } from "lucide-react";
import { Container } from "./ui";

const NAV = [
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Processo", href: "#processo" },
  { label: "Studio", href: "#studio" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#050607]">
      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-4">
          <a href="#top" aria-label="Nord Garage — voltar ao início" className="inline-block leading-none">
            <span className="font-display text-[20px] font-bold tracking-[-0.01em]">
              NORD<span className="text-lime">.</span>GARAGE
            </span>
            <span className="mt-[6px] block font-mono text-[8px] uppercase tracking-[0.34em] text-mute">
              Automotive Detailing Studio
            </span>
          </a>
          <p className="mt-6 max-w-[260px] font-display text-[17px] font-medium tracking-[-0.01em] text-metal">
            Precisão em cada detalhe.
          </p>
        </div>

        {/* Nav */}
        <div className="lg:col-span-2">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-mute">Navegar</p>
          <ul className="mt-6 space-y-3.5">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[13.5px] text-metal transition-colors hover:text-bone">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div className="lg:col-span-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-mute">Horários</p>
          <ul className="mt-6 max-w-[280px] space-y-3.5 text-[13.5px]">
            <li className="flex justify-between gap-4">
              <span className="text-mute">Segunda — Sexta</span>
              <span className="text-bone">08:00 — 18:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-mute">Sábado</span>
              <span className="text-bone">08:00 — 13:00</span>
            </li>
          </ul>
          <p className="mt-6 font-mono text-[9.5px] uppercase tracking-[0.22em] text-lime/80">
            Atendimento com hora marcada
          </p>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-mute">Contato</p>
          <address className="mt-6 space-y-3.5 text-[13.5px] not-italic">
            <p className="leading-relaxed text-mute">
              Rua Nord, 247
              <br />
              Curitiba — PR
            </p>
            <p>
              <a href="tel:+5541999999999" className="text-bone transition-colors hover:text-lime">
                (41) 99999-9999
              </a>
            </p>
          </address>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute/70">
            © {year} Nord Garage — Projeto conceito para portfólio
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-mute/80 transition-colors hover:text-lime"
          >
            Voltar ao topo
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2} />
          </a>
        </Container>
      </div>

      {/* Giant outline wordmark */}
      <div className="pointer-events-none relative select-none" aria-hidden>
        <div
          className="-mb-[0.16em] whitespace-nowrap text-center font-display text-[15.5vw] font-extrabold leading-[0.84] tracking-[-0.03em]"
          style={{ WebkitTextStroke: "1px rgba(245,245,243,0.075)", color: "transparent" }}
        >
          NORD GARAGE
        </div>
      </div>
    </footer>
  );
}
