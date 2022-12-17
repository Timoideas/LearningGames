import style from "styles/pages/index.module.css";
import Head from "heads/main.head";
import {
  Section,
  Body,
  Content,
} from "components/timoideas/Timoideas.components";
import SopaDeLetras from "components/games/sopa_de_letras/Play.component";

export default function Page() {
  return (
    <>
      <Head />
      <Body>
        <Section>
          <Content center>
            <SopaDeLetras />
          </Content>
        </Section>
      </Body>
    </>
  );
}
