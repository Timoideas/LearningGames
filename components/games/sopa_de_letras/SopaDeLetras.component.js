import CreateSopaDeLetras from "libraries/games/sopa_de_letras";
import style from "./SopaDeLetras.module.css";
import Letra from "./Letra.component";
import { useEffect, useRef, useState } from "react";
export default function SopaDeLetras({ palabras }) {
  const [sopaArray, setSopaArray] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);
  const [inSelection, setInSelection] = useState(false);
  console.log("selectedArea", selectedArea);
  useEffect(() => {
    setSopaArray(
      CreateSopaDeLetras({
        palabras: palabras.map((palabra) => palabra.palabra),
        relleno: 2,
      })
    );
    return () => {};
  }, []);

  // Obtiene la posición de la letra
  const getPosition = (e) =>
    e.target.dataset.position.split(",").map((n) => parseInt(n));
  // Verifica si el elemento es una letra
  const isLetter = (e) => e.target.matches("[data-type=letter]");
  //Verifica si la posición es repetida en la Area seleccionada
  const isDifferentPosition = (pos, arr) =>
    !arr.some((elem) => JSON.stringify(pos) === JSON.stringify(elem));
  // Maneja cuando se hace click en una letra
  const handlerMouseDown = (e) => {
    if (isLetter(e)) {
      const position = getPosition(e);
      isDifferentPosition(position, selectedArea) &&
        setSelectedArea((prev) => [position, ...prev]);
      setInSelection(true);
    }
  };

  // Maneja cuando se mueve el mouse sobre una letra
  const handlerMouseMove = (e) => {
    if (isLetter(e) && inSelection) {
      const [index, _index] = getPosition(e);
      inSelection &&
        isDifferentPosition([index, _index], selectedArea) &&
        setSelectedArea((prev) => {
          const last = prev[prev.length - 1];
          if (last[0] === index && last[1] === _index) {
            return prev;
          }
          return [...prev, [index, _index], last];
        });
    }
  };
  // Maneja cuando se suelta el click
  const handlerMouseUp = (e) => {
    if (isLetter(e) && inSelection) {
      const [index, _index] = getPosition(e);
      setInSelection(false);
      isDifferentPosition([index, _index], selectedArea) &&
        setSelectedArea((prev) => {
          const last = prev[prev.length - 1];
          if (last[0] === index && last[1] === _index) {
            return prev;
          }
          return prev.includes([index, _index]);
        });
      // setSelectedArea([]);
    }
  };

  return (
    <div
      className={style.Container}
      onMouseDown={handlerMouseDown}
      onMouseMove={handlerMouseMove}
      onMouseUp={handlerMouseUp}
    >
      {sopaArray.map((row, index) => (
        <div key={index} className={style.row}>
          {row.map((letter, _index) => (
            <Letra
              size={40}
              data-type="letter"
              data-position={[index, _index]}
              key={index + letter + _index}
              isCorrect={
                selectedArea.some(([i, _i]) => i === index && _i === _index) &&
                letter !== " "
              }
            >
              {letter}
            </Letra>
          ))}
        </div>
      ))}
    </div>
  );
}
