import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import type { Project } from "../../data/projects";
import { Chip, Container, EASE, Label, MLine, Reveal } from "../ui";

/**
 * Service-specific feature modules — one per service type, so each
 * case owns a unique moment that no other project reuses.
 */

function SectionHead({
  label,
  lines,
  note,
}: {
  label: string;
  lines: [string, string];
  note?: string;
}) {
  return (
    <div className="grid items-end gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <Reveal>
          <Label>{label}</Label>
        </Reveal>
        <h2 className="mt-6 font-display font-semibold leading-[1.0] tracking-[-0.03em] text-[clamp(1.9rem,4.2vw,3.5rem)]">
          <MLine delay={0.06}>{lines[0]}</MLine>
          <MLine delay={0.14}>{lines[1]}</MLine>
        </h2>
      </div>
      {note && (
        <div className="lg:col-span-4">
          <Reveal delay={0.2}>
            <p className="max-w-[320px] text-[14px] leading-relaxed text-mute lg:ml-auto">{note}</p>
          </Reveal>
        </div>
      )}
    </div>
  );
}

/* 01 — Porsche 911: editorial split Before / After (no slider, no paint-macro) */
export function FeatureCompare() {
  const BEFORE = [
    { t: "Micro riscos no verniz", d: "Causados por lavagens automáticas e esponjas abrasivas." },
    { t: "Swirl marks", d: "Marcas circulares visíveis sob luz direta ou de estúdio." },
    { t: "Reflexo irregular", d: "Pintura perde profundidade e uniformidade." },
  ];
  const AFTER = [
    { t: "Verniz corrigido", d: "Superfície nivelada em dois estágios de polimento técnico." },
    { t: "Reflexo uniforme", d: "Leitura limpa e contínua sob qualquer ângulo de luz." },
    { t: "Coating cerâmico", d: "Camada de proteção que sela e preserva o resultado." },
  ];

  return (
    <section className="border-t border-white/[0.06] py-24 md:py-32">
      <Container>
        <SectionHead
          label="Paint correction — Before / After"
          lines={["Antes e depois,", "no mesmo verniz."]}
          note="Polimento técnico em dois estágios. O resultado é visto — e sentido — na primeira passagem de luz."
        />

        {/* Two-panel photographic comparison — distinct images per side */}
        <Reveal y={40} className="mt-12 md:mt-14">
          <div className="grid gap-3 sm:grid-cols-2">
            {/* BEFORE — polishing in progress */}
            <div className="group relative overflow-hidden rounded-xl border border-white/[0.08]">
              <div className="relative h-[280px] overflow-hidden sm:h-[400px] lg:h-[480px]">
                <img
                  src="/img/svc-polimento.jpg"
                  alt="Polimento técnico em andamento no Porsche 911 — processo de correção"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[62%_50%] brightness-[0.78] contrast-[1.1] saturate-[0.65] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-4 bottom-4">
                <span className="inline-block rounded-full border border-white/20 bg-black/50 px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.26em] text-bone/85 backdrop-blur-sm">
                  Antes — correção
                </span>
                <ul className="mt-3 space-y-1.5">
                  {BEFORE.map((b) => (
                    <li key={b.t} className="flex items-baseline gap-2 text-[11.5px] text-bone/70">
                      <span className="mt-1 h-[4px] w-[4px] shrink-0 bg-white/35" aria-hidden />
                      {b.t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AFTER — delivered, coated */}
            <div className="group relative overflow-hidden rounded-xl border border-white/[0.08]">
              <div className="relative h-[280px] overflow-hidden sm:h-[400px] lg:h-[480px]">
                <img
                  src="/img/gallery-a.jpg"
                  alt="Porsche 911 Carrera após polimento e vitrificação — entrega"
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: "50% 58%" }}
                  className="h-full w-full object-cover saturate-[1.05] contrast-[1.05] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-4 bottom-4">
                <span className="inline-block rounded-full border border-lime/30 bg-black/50 px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.26em] text-lime backdrop-blur-sm">
                  Depois — entrega
                </span>
                <ul className="mt-3 space-y-1.5">
                  {AFTER.map((a) => (
                    <li key={a.t} className="flex items-baseline gap-2 text-[11.5px] text-bone/70">
                      <span className="mt-1 h-[4px] w-[4px] shrink-0 bg-lime/70" aria-hidden />
                      {a.t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Fine-print comparison rows */}
        <div className="mt-10 grid gap-0 md:grid-cols-2">
          <Reveal>
            <div className="border-t border-white/[0.08] py-5 md:pr-10">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-mute">Estado anterior</p>
              {BEFORE.map((b) => (
                <div key={b.t} className="mt-3 border-t border-white/[0.06] pt-3">
                  <p className="text-[13px] font-medium text-bone/80">{b.t}</p>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-mute">{b.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-t border-white/[0.08] py-5 md:border-l md:border-t-0 md:pl-10">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-lime/85">Resultado final</p>
              {AFTER.map((a) => (
                <div key={a.t} className="mt-3 border-t border-white/[0.06] pt-3">
                  <p className="text-[13px] font-medium text-bone">{a.t}</p>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-mute">{a.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* 02 — BMW 320i: hydrophobic performance */
export function FeatureHydrophobic() {
  return (
    <section className="border-t border-white/[0.06] py-24 md:py-32">
      <Container>
        <SectionHead
          label="Ceramic coating — Hydrophobic performance"
          lines={["Água não encontra", "onde segurar."]}
          note="A proteção cerâmica cria uma camada resistente sobre o verniz e facilita a manutenção da pintura."
        />
        <div className="mt-10 flex flex-wrap gap-2.5">
          <Chip>Beading</Chip>
          <Chip>Sheeting</Chip>
          <Chip>Low maintenance</Chip>
        </div>
        <motion.div
          initial={{ clipPath: "inset(16% 3% 16% 3% round 12px)", opacity: 0.4 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.6, ease: EASE }}
          className="mt-10 overflow-hidden rounded-xl border border-white/[0.09]"
        >
          <motion.img
            src="/img/svc-vitrificacao.jpg"
            alt="Aplicação de cerâmico sobre o BMW 320i — proteção hidrofóbica de alta durabilidade"
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: EASE }}
            className="h-[320px] w-full object-cover object-[50%_52%] md:h-[54svh]"
          />
        </motion.div>
        <Reveal className="mt-6">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-mute">
            Superfície selada · contato de água minimizado · reflexo preservado
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* 03 — BMW M3: PPF protection map */
const MAP_POINTS = [
  { n: "01", x: 300, y: 96, t: "Capô" },
  { n: "02", x: 300, y: 216, t: "Para-choque" },
  { n: "03", x: 116, y: 176, t: "Paralamas" },
  { n: "04", x: 484, y: 108, t: "Retrovisores" },
];

export function FeatureProtectionMap() {
  return (
    <section className="border-t border-white/[0.06] py-24 md:py-32">
      <Container>
        <SectionHead
          label="PPF + Coating — Protection map"
          lines={["Cada camada", "tem sua função."]}
          note="PPF absorve o impacto físico. O coating entrega hidrofobia e brilho. Funções diferentes, complemento total."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Technical diagram */}
          <Reveal y={36} className="lg:col-span-7">
            <div className="rounded-xl border border-white/[0.09] bg-ink-2/40 p-6 sm:p-10">
              <svg viewBox="0 0 600 268" className="h-auto w-full" role="img" aria-label="Diagrama frontal do veículo com áreas cobertas por PPF">
                <g fill="none" stroke="rgba(245,245,243,0.2)" strokeWidth="1.2">
                  <path d="M52 200 C52 132 96 112 152 102 L186 58 C192 48 202 42 214 42 L386 42 C398 42 408 48 414 58 L448 102 C504 112 548 132 548 200 C548 218 538 230 520 230 L80 230 C62 230 52 218 52 200 Z" />
                  <path d="M166 100 L198 62 C202 55 210 51 218 51 L382 51 C390 51 398 55 402 62 L434 100" />
                  <path d="M84 152 L150 152" />
                  <path d="M450 152 L516 152" />
                  <rect x="244" y="142" width="48" height="60" rx="11" />
                  <rect x="308" y="142" width="48" height="60" rx="11" />
                  <path d="M206 216 L394 216" />
                  <path d="M92 108 L76 96 L118 88" />
                  <path d="M508 108 L524 96 L482 88" />
                </g>
                {MAP_POINTS.map((p) => (
                  <g key={p.n}>
                    <circle cx={p.x} cy={p.y} r="14" fill="none" stroke="rgba(214,255,69,0.4)" strokeWidth="1" />
                    <circle cx={p.x} cy={p.y} r="3.5" fill="#D6FF45" />
                    <text
                      x={p.x + (p.n === "03" ? -62 : p.n === "04" ? 26 : 24)}
                      y={p.y + 4}
                      fill="#B8BEC7"
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                      letterSpacing="2"
                    >
                      {p.n}
                    </text>
                  </g>
                ))}
                <text x="52" y="260" fill="#8F949C" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
                  FRONT — PROTECTED ZONES
                </text>
                <text x="548" y="260" fill="#8F949C" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="3" textAnchor="end">
                  SCALE 1:1
                </text>
              </svg>
            </div>
          </Reveal>

          {/* Coverage list */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-lime/85">PPF Coverage</p>
              <ul className="mt-4">
                {MAP_POINTS.map((p) => (
                  <li
                    key={p.n}
                    className="flex items-baseline justify-between gap-6 border-t border-white/[0.09] py-4 last:border-b"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-mute">{p.n}</span>
                      <span className="text-[15px] font-medium text-bone">{p.t}</span>
                    </span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-mute">PPF</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 flex items-baseline justify-between gap-6 border-t border-white/[0.09] py-4">
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-mute">+</span>
                  <span className="text-[15px] font-medium text-bone">Demais superfícies expostas</span>
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-lime/85">Coating</span>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-mute">
                Cerâmico aplicado sobre a película e em todo o restante do veículo — proteção química e física em
                conjunto.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 04 — Audi RS3: the process, visual sequence */
const RS3_STEPS = [
  { t: "Inspeção", d: "Registro fotográfico do estado geral." },
  { t: "Lavagem técnica", d: "Processo seguro em duas etapas." },
  { t: "Descontaminação", d: "Química e mecânica, por material." },
  { t: "Correção", d: "Remoção das marcas de lavagem." },
  { t: "Refino", d: "Nitidez final do reflexo." },
  { t: "Proteção", d: "Selantes específicos por superfície." },
  { t: "Interior", d: "Higienização e hidratação da cabine." },
  { t: "Final check", d: "Revisão completa em luz técnica." },
];

export function FeatureProcessVisual() {
  const left = RS3_STEPS.slice(0, 4);
  const right = RS3_STEPS.slice(4);
  const StepRow = ({ s, i }: { s: (typeof RS3_STEPS)[number]; i: number }) => (
    <div className="flex gap-5 border-t border-white/[0.08] py-4 last:border-b">
      <span className="font-mono text-[10px] tracking-[0.2em] text-lime">{String(i + 1).padStart(2, "0")}</span>
      <span>
        <span className="block text-[14.5px] font-semibold text-bone">{s.t}</span>
        <span className="mt-1 block text-[12.5px] leading-relaxed text-mute">{s.d}</span>
      </span>
    </div>
  );

  return (
    <section className="border-t border-white/[0.06] py-24 md:py-32">
      <Container>
        <SectionHead
          label="Full detail — The process"
          lines={["Oito frentes.", "Um padrão."]}
          note="Nenhuma etapa pulada. A sequência abaixo é o veículo inteiro — não apenas a pintura."
        />

        {/* Mobile visual */}
        <Reveal y={36} className="mt-12 md:hidden">
          <div className="overflow-hidden rounded-xl border border-white/[0.09]">
            <img src="/img/svc-polimento.jpg" alt="Polimento técnico no RS3" loading="lazy" decoding="async" className="h-[260px] w-full object-cover object-[62%_50%]" />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8 md:items-stretch">
          <Reveal className="md:col-span-4" delay={0.05}>
            <div>{left.map((s, i) => <StepRow key={s.t} s={s} i={i} />)}</div>
          </Reveal>
          <Reveal y={40} className="hidden md:col-span-4 md:block" delay={0.1}>
            <div className="h-full min-h-[420px] overflow-hidden rounded-xl border border-white/[0.09]">
              <img
                src="/img/svc-polimento.jpg"
                alt="Máquina de polimento corrigindo a pintura do RS3"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[62%_50%]"
              />
            </div>
          </Reveal>
          <Reveal className="md:col-span-4" delay={0.15}>
            <div>{right.map((s, i) => <StepRow key={s.t} s={s} i={i + 4} />)}</div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* 05 — Porsche Macan: interactive split using distinct images per side */
export function FeatureFiftyFifty() {
  return (
    <section className="border-t border-white/[0.06] py-24 md:py-32">
      <Container>
        <SectionHead
          label="Paint correction — 50/50"
          lines={["A diferença aparece", "quando a luz acende."]}
          note="Dois estados do mesmo veículo, sob a mesma luz de inspeção. Arraste o divisor."
        />

        <Reveal y={40} className="mt-12 md:mt-14">
          <MacanCompare />
        </Reveal>
      </Container>
    </section>
  );
}

/** Slider dedicado ao Macan: usa svc-polimento (BEFORE) vs studio.jpg (AFTER). */
function MacanCompare() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const [pos, setPos] = useState(54);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const draggingRef = useRef(false);
  const interactedRef = useRef(false);
  const introRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => {
      if (interactedRef.current) return;
      const controls = animate(54, [40, 62, 52], {
        duration: 2.4,
        ease: "easeInOut",
        onUpdate: (v) => setPos(v as number),
      });
      introRef.current = controls;
    }, 500);
    return () => {
      window.clearTimeout(id);
      introRef.current?.stop();
    };
  }, [inView]);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.min(94, Math.max(6, ((clientX - rect.left) / rect.width) * 100)));
  };

  const markInteracted = () => {
    interactedRef.current = true;
    setTouched(true);
    introRef.current?.stop();
  };

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label="Comparação antes e depois da correção de pintura do Porsche Macan"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      onPointerDown={(e) => {
        draggingRef.current = true;
        setDragging(true);
        markInteracted();
        ref.current?.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => { if (draggingRef.current) update(e.clientX); }}
      onPointerUp={() => { draggingRef.current = false; setDragging(false); }}
      onPointerCancel={() => { draggingRef.current = false; setDragging(false); }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { markInteracted(); setPos((p) => Math.max(6, p - 5)); }
        if (e.key === "ArrowRight") { markInteracted(); setPos((p) => Math.min(94, p + 5)); }
      }}
      className="group relative h-[380px] cursor-ew-resize touch-none select-none overflow-hidden rounded-xl border border-white/[0.09] bg-ink-2 sm:h-[480px] lg:h-[560px]"
    >
      {/* AFTER — studio shot, sharp and polished */}
      <img
        src="/img/studio.jpg"
        alt="Porsche Macan após correção de pintura no estúdio, pintura uniforme"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[50%_55%] brightness-[0.88] saturate-[0.72] contrast-[1.08]"
      />

      {/* BEFORE — polishing process, clipped to left side */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src="/img/svc-polimento.jpg"
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[62%_50%] brightness-[0.72] contrast-[0.9] saturate-[0.35]"
        />
        {/* scratch-haze overlay */}
        <div className="pointer-events-none absolute inset-0 bg-white/[0.04]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-screen"
          style={{
            backgroundImage:
              "repeating-linear-gradient(68deg, rgba(255,255,255,.4) 0px, rgba(255,255,255,.4) 1px, transparent 1px, transparent 22px)",
          }}
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.26em] text-bone/85 backdrop-blur-sm">
        Antes
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-lime/30 bg-black/50 px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.26em] text-lime backdrop-blur-sm">
        Depois
      </span>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden>
        <div className="absolute inset-y-0 left-0 w-px -translate-x-1/2 bg-white/85 shadow-[0_0_14px_rgba(0,0,0,0.65)]" />
        <div className={`absolute left-0 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border backdrop-blur-md transition-colors duration-300 ${dragging ? "border-lime bg-black/60 text-lime" : "border-white/40 bg-black/45 text-bone"}`}>
          <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M6 10H14M6 10L3 7M6 10L3 13M14 10L17 7M14 10L17 13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Bottom labels */}
      <div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-bone/55">
        <span>Swirl marks · Hologramas</span>
        <span>Reflexo uniforme · Selante</span>
      </div>

      {/* Hint */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: touched ? 0 : 1 }}
        transition={{ delay: touched ? 0 : 1.4, duration: 0.6 }}
        className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/55 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.26em] text-bone/70 backdrop-blur-sm"
        aria-hidden
      >
        Arraste o divisor
      </motion.span>
    </div>
  );
}

/* 06 — Ford Mustang: emotional chapters */
const CHAPTERS = [
  {
    n: "01",
    t: "Exterior",
    d: "Presença antes mesmo da ignição. Pintura, vidros, rodas e spoiler sob medida.",
    img: "https://images.pexels.com/photos/13897261/pexels-photo-13897261.jpeg?auto=compress&cs=tinysrgb&w=1800",
    fallback: "/img/hero.jpg",
    pos: "50% 56%",
    alt: "Ford Mustang visto de traseira ao entardecer",
  },
  {
    n: "02",
    t: "Interior",
    d: "Cabine higienizada e couro hidratado — o carro que abraça o motorista.",
    img: "https://images.pexels.com/photos/17791075/pexels-photo-17791075.jpeg?auto=compress&cs=tinysrgb&w=1800",
    fallback: "/img/svc-interior.jpg",
    pos: "50% 50%",
    alt: "Interior e cockpit do Ford Mustang após a higienização",
  },
  {
    n: "03",
    t: "Finish",
    d: "Cera de carnaúba aplicada à mão. A última leitura é da luz, não nossa.",
    img: "https://images.pexels.com/photos/18785790/pexels-photo-18785790.jpeg?auto=compress&cs=tinysrgb&w=1800",
    fallback: "/img/final.jpg",
    pos: "50% 52%",
    alt: "Detalhe da traseira do Ford Mustang após o acabamento final",
  },
];

export function FeatureChapters() {
  return (
    <section className="border-t border-white/[0.06] py-24 md:py-32">
      <Container>
        <SectionHead label="Premium detail — Narrative" lines={["Detail is", "the difference."]} />
        <div className="mt-14 md:mt-18">
          {CHAPTERS.map((c) => (
            <div key={c.n} className="grid gap-6 border-t border-white/[0.08] py-10 md:grid-cols-12 md:gap-10 md:py-14">
              <div className="md:col-span-3">
                <Reveal>
                  <p className="font-mono text-[10px] tracking-[0.24em] text-lime">{c.n}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-[0.02em] text-bone md:text-[28px]">
                    {c.t}
                  </h3>
                </Reveal>
              </div>
              <div className="md:col-span-9">
                <Reveal delay={0.08}>
                  <p className="max-w-[520px] text-[14.5px] leading-relaxed text-mute">{c.d}</p>
                </Reveal>
                <Reveal y={36} delay={0.12} className="mt-6">
                  <div className="overflow-hidden rounded-xl border border-white/[0.09]">
                    <img
                      src={c.img}
                      alt={c.alt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        if (event.currentTarget.dataset.fallback === "true") return;
                        event.currentTarget.dataset.fallback = "true";
                        event.currentTarget.src = c.fallback;
                      }}
                      style={{ objectPosition: c.pos }}
                      className="h-[280px] w-full object-cover brightness-[0.72] contrast-[1.1] saturate-[0.65] sm:h-[340px] lg:h-[400px]"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FeatureSwitch({ project }: { project: Project }) {
  switch (project.feature) {
    case "compare":
      return <FeatureCompare />;
    case "hydro":
      return <FeatureHydrophobic />;
    case "map":
      return <FeatureProtectionMap />;
    case "process":
      return <FeatureProcessVisual />;
    case "fifty":
      return <FeatureFiftyFifty />;
    case "chapters":
      return <FeatureChapters />;
  }
}

