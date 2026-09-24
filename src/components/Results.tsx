import { Container, It, Label, MLine, Reveal } from "./ui";
import CompareSlider from "./CompareSlider";

export default function Results() {
  return (
    <section id="resultados" className="py-24 md:py-36 lg:py-44">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Label>01 · Resultados</Label>
            </Reveal>
            <h2 className="mt-7 font-display font-semibold leading-[1.0] tracking-[-0.03em] text-[clamp(2.1rem,4.8vw,4rem)]">
              <MLine delay={0.06}>
                <span>
                  O <It>detalhe</It> muda
                </span>
              </MLine>
              <MLine delay={0.15}>o carro inteiro.</MLine>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.18}>
              <p className="max-w-[340px] text-[14.5px] leading-relaxed text-mute lg:ml-auto">
                O mesmo enquadramento, duas pinturas diferentes. Arraste o divisor e veja o que a correção de verniz é
                capaz de fazer.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.08} y={44} className="mt-12 md:mt-16">
          <CompareSlider />
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-10">
          <Reveal>
            <p className="max-w-[520px] text-[15.5px] leading-relaxed text-metal">
              Micro riscos, marcas de lavagem e perda de brilho transformam a aparência do veículo — e quase sempre
              passam despercebidos no dia a dia.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-[520px] text-[15.5px] leading-relaxed text-metal md:ml-auto md:text-right">
              Nosso processo recupera profundidade, reflexo e acabamento. A primeira impressão de zero quilômetro,
              devolvida.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
