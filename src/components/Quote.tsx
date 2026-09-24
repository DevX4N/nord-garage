import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, LoaderCircle, MessageCircle } from "lucide-react";
import { CTA, Container, EASE, It, Label, MLine, Reveal } from "./ui";
import { cn } from "../utils/cn";

const WA_LINK =
  "https://wa.me/5541999999999?text=Ol%C3%A1!%20Quero%20avaliar%20meu%20carro%20na%20Nord%20Garage.";

const inputCls =
  "w-full rounded-none border-0 border-b border-white/15 bg-transparent px-0 py-3 text-[15px] text-bone placeholder:text-mute/40 outline-none transition-colors duration-300 focus:border-lime";

function Field({
  label,
  required,
  children,
  span,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  span?: boolean;
}) {
  return (
    <label className={cn("block", span && "sm:col-span-2")}>
      <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.24em] text-mute">
        {label}
        {required && <span className="text-lime"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function Quote() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  return (
    <section id="contato" className="py-24 md:py-36 lg:py-44">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Copy + WhatsApp */}
          <div className="lg:col-span-5">
            <Reveal>
              <Label>09 · Orçamento</Label>
            </Reveal>
            <h2 className="mt-7 font-display font-semibold leading-[1.02] tracking-[-0.03em] text-[clamp(2.1rem,4.8vw,4rem)]">
              <MLine delay={0.06}>Qual tratamento</MLine>
              <MLine delay={0.15}>
                <span>
                  seu carro <It>precisa?</It>
                </span>
              </MLine>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-[420px] text-[14.5px] leading-relaxed text-mute md:text-[15.5px]">
                Conte para nós qual é o veículo e o que você deseja melhorar. Analisamos e devolvemos a avaliação
                ideal — normalmente no mesmo dia útil.
              </p>
            </Reveal>

            <Reveal delay={0.24} className="mt-10">
              <div className="flex flex-col gap-6 rounded-xl border border-white/[0.09] bg-white/[0.015] p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
                <div>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-mute">Prefere WhatsApp?</p>
                  <p className="mt-2.5 text-[15px] font-medium text-bone">Fale direto com um especialista.</p>
                </div>
                <CTA
                  href={WA_LINK}
                  variant="ghost"
                  className="shrink-0"
                  icon={<MessageCircle className="h-4 w-4" strokeWidth={2.2} />}
                >
                  Falar com especialista
                </CTA>
              </div>
            </Reveal>

            <Reveal delay={0.28} className="mt-10">
              <ul className="space-y-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                <li className="flex justify-between gap-4 border-t border-white/[0.07] pt-3.5">
                  <span>Seg — Sex</span>
                  <span className="text-metal">08:00 — 18:00</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Sábado</span>
                  <span className="text-metal">08:00 — 13:00</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Endereço</span>
                  <span className="text-metal">Rua Nord, 247 — Curitiba, PR</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-white/[0.07] pb-3.5">
                  <span>WhatsApp</span>
                  <span className="text-metal">(41) 99999-9999</span>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form panel */}
          <div className="lg:col-span-7">
            <Reveal y={40} delay={0.1}>
              <div className="rounded-2xl border border-white/[0.08] bg-ink-2/70 p-6 sm:p-9 md:p-11">
                {status === "sent" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="flex min-h-[420px] flex-col items-start justify-center"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-lime/40 bg-lime/10 text-lime">
                      <Check className="h-6 w-6" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-7 font-display text-[28px] font-semibold tracking-[-0.02em] text-bone md:text-[32px]">
                      Recebido.
                      <br />
                      A gente chama você.
                    </h3>
                    <p className="mt-4 max-w-[380px] text-[14.5px] leading-relaxed text-mute">
                      Nossa equipe entra em contato pelo WhatsApp informado com a avaliação do seu veículo.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-9 cursor-pointer border-b border-lime/60 pb-1 text-[13px] font-medium text-lime transition-colors hover:border-lime"
                    >
                      Enviar outra avaliação
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (status === "sending") return;
                      setStatus("sending");
                      window.setTimeout(() => setStatus("sent"), 1200);
                    }}
                  >
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-mute">
                      Avaliação sem compromisso · resposta rápida
                    </p>
                    <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                      <Field label="Nome" required>
                        <input required name="nome" type="text" placeholder="Seu nome" className={inputCls} autoComplete="name" />
                      </Field>
                      <Field label="WhatsApp" required>
                        <input
                          required
                          name="whatsapp"
                          type="tel"
                          placeholder="(41) 90000-0000"
                          className={inputCls}
                          autoComplete="tel"
                        />
                      </Field>
                      <Field label="Veículo" required>
                        <input required name="veiculo" type="text" placeholder="Ex.: BMW 320i M Sport" className={inputCls} />
                      </Field>
                      <Field label="Ano" required>
                        <input required name="ano" type="text" inputMode="numeric" placeholder="Ex.: 2023" className={inputCls} />
                      </Field>
                      <Field label="Serviço de interesse" span>
                        <div className="relative">
                          <select name="servico" defaultValue="" required className={cn(inputCls, "appearance-none pr-8 [&:user-invalid]:border-white/15")}>
                            <option value="" disabled>
                              Selecione uma opção
                            </option>
                            <option>Polimento</option>
                            <option>Vitrificação</option>
                            <option>PPF</option>
                            <option>Higienização</option>
                            <option>Detalhamento completo</option>
                            <option>Não sei qual escolher</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute bottom-4 right-0 h-4 w-4 text-mute" strokeWidth={2} />
                        </div>
                      </Field>
                      <Field label="Conte um pouco sobre o veículo (opcional)" span>
                        <textarea
                          name="mensagem"
                          rows={3}
                          placeholder="Estado da pintura, uso diário, o que incomoda você..."
                          className={cn(inputCls, "resize-none")}
                        />
                      </Field>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                      <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mute/80">
                        Seus dados não são compartilhados
                      </p>
                      <CTA type="submit" className={cn(status === "sending" && "pointer-events-none opacity-80")}>
                        {status === "sending" ? (
                          <>
                            Enviando
                            <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2.4} />
                          </>
                        ) : (
                          "Solicitar avaliação"
                        )}
                      </CTA>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
