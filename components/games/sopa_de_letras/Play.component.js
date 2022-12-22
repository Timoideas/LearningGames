import { useRef, useState } from "react";
import Palabras from "./Palabras.component";
import style from "./Play.module.css";
import SopaDeLetras from "./SopaDeLetras.component";
import useTemporizador from "hooks/useTemporizador.hook";
import formatSeconds from "libraries/global/formatSeconds";
export default function Play() {
  const [time, setTime] = useState(0);
  const [fallos, setFallos] = useState(0);
  const sopaRef = useRef();
  const palabras = [
    {
      palabra: "hola",
      position: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      isCorrect: false,
    },
    {
      palabra: "pingüino",
      position: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      isCorrect: false,
    },
    {
      palabra: "estás",
      position: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      isCorrect: false,
    },
  ];
  const [intentos, setIntentos] = useState(
    Array.from({ length: 3 }, (_, index) => index)
  );
  const {
    tiempo: { actual, fin, inicio, resto, transcurrido },
    constroles: { iniciar, pausar, reiniciar },
    isFinished,
  } = useTemporizador({
    tiempo: 805,
  });
  return (
    <div className={style.Container}>
      <h1>Sopa de letras</h1>
      <div>
        {/* <p>{inicio}</p> */}
        <div>{actual} - </div>
        <p>- {transcurrido}</p>
        <button onClick={iniciar}>Iniciar</button>
        <button onClick={pausar}>pausar</button>
        <button onClick={reiniciar}>reiniciar</button>
      </div>
      <div
        className={style.Print}
        color="blue"
        onClick={() => {
          // imprimir solo <SopaDeLetras />
        }}
      >
        Imprimir
      </div>
      <h2>
        Intentos:{" "}
        {
          // por cada vida restante, se muestra un corazón
          // si no hay vidas restantes, se muestra un corazón roto
          intentos.map((_, index) => (
            <span key={index} role="img" aria-label="heart">
              {"❤️"}
            </span>
          ))
        }
      </h2>
      <div ref={sopaRef}>
        <SopaDeLetras
          palabras={palabras}
          intentos={{ intentos, setIntentos }}
        />
      </div>
      <Palabras palabras={palabras} />
    </div>
  );
}
