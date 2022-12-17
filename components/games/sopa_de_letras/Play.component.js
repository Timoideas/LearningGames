import { useState } from "react";
import Palabras from "./Palabras.component";
import style from "./Play.module.css";
import SopaDeLetras from "./SopaDeLetras.component";
export default function Play() {
  const [time, setTime] = useState(0);
  const [fallos, setFallos] = useState(0);

  const palabras = [
    {
      palabra: "haola",
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
  return (
    <div className={style.Container}>
      <SopaDeLetras palabras={palabras} />
      <Palabras palabras={palabras} />
    </div>
  );
}
