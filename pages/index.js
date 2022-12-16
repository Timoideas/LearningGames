import style from "styles/pages/index.module.css";
import Head from "heads/main.head";
import {
  Section,
  Body,
  Content,
} from "components/timoideas/Timoideas.components";
import SopaDeLetras from "libraries/games/sopa_de_letras";
export default function Page() {
  return (
    <>
      <Head />
      <Body>
        <Section>
          <Content center>
            {SopaDeLetras({
              palabras: ["hola", "pingüino", "estás"],
              relleno: 2,
            }).map((row, index) => (
              <div key={index} className={style.row}>
                {row.map((letter, index) => (
                  <span key={index} className={style.letter}>
                    {letter}
                  </span>
                ))}
              </div>
            ))}
          </Content>
        </Section>
      </Body>
    </>
  );
}
