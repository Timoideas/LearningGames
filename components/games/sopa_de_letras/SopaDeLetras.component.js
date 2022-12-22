import CreateSopaDeLetras from "libraries/games/sopa_de_letras";
import style from "./SopaDeLetras.module.css";
import Letra from "./Letra.component";
import { useEffect, useRef, useState } from "react";
export default function SopaDeLetras({
  palabras,
  intentos: { intentos, setIntentos },
  ...props
}) {
  const [sopaArray, setSopaArray] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);
  const [inSelection, setInSelection] = useState(false);
  const [solucion, setSolucion] = useState([]);
  const [state, setstate] = useState();
  const [directionSelected, setDirectionSelected] = useState([]);

  useEffect(() => {
    const { sopa_de_letras, solucion } = CreateSopaDeLetras({
      palabras: palabras.map((palabra) => palabra.palabra),
      relleno: 2,
    });
    setSolucion(solucion);
    setSopaArray(sopa_de_letras);
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
    const position = getPosition(e);
    setSelectedArea([position]);
    setInSelection(true);
  };

  // Maneja cuando se mueve el mouse sobre una letra
  const handlerMouseOver = (e) => {
    if (inSelection) {
      const [index, _index] = getPosition(e);
      if (isDifferentPosition([index, _index], selectedArea)) {
        let ejesForm = directionSelected.map((eje) =>
          eje === 0 ? () => null : eje === 1 ? (a, b) => a > b : (a, b) => a < b
        );
        let enDireccion;
        let direccionSeleccionada = directionSelected;
        // si solo se ha seleccionado una letra establecer la dirección teniendo en cuenta la posición de la primera letra78
        if (selectedArea.length === 1) {
          const [i, _i] = selectedArea[0];
          let resta = [index - i, _index - _i];
          direccionSeleccionada = resta.map((n) =>
            n <= -1 ? -1 : n >= 1 ? 1 : 0
          );
          // si es que la resta es distinta a la dirección seleccionada, agregar todos los elementos faltantes según la dirección
          if (JSON.stringify(resta) !== JSON.stringify(direccionSeleccionada)) {
            // por eje plo si resta es [-4,4] y direccionSeleccionada es [-1,1] entonces se agregan los elementos [-3, 3] y [-2, 2]
            let restaAbs = resta.map((n) => Math.abs(n));
            let restaAbsMax = Math.max(...restaAbs);
            for (let i = 1; i < restaAbsMax; i++) {
              setSelectedArea((prev) => {
                return [
                  ...prev,
                  [
                    selectedArea[selectedArea.length - 1][0] +
                      direccionSeleccionada[0],
                    selectedArea[selectedArea.length - 1][1] +
                      direccionSeleccionada[1],
                  ],
                ];
              });
            }
          }
          setDirectionSelected(direccionSeleccionada);
          ejesForm = direccionSeleccionada.map((eje) =>
            eje === 0
              ? () => null
              : eje === 1
              ? (a, b) => a > b
              : (a, b) => a < b
          );
          enDireccion = true;
        }
        enDireccion =
          (ejesForm[0](index, selectedArea[selectedArea.length - 1][0]) ??
            false) ||
          (ejesForm[1](_index, selectedArea[selectedArea.length - 1][1]) ??
            false);
        // solo se agregará si la posición cumple con la formula de la dirección
        if (enDireccion) {
          setSelectedArea((prev) => {
            return [
              ...prev,
              [
                selectedArea[selectedArea.length - 1][0] +
                  direccionSeleccionada[0],
                selectedArea[selectedArea.length - 1][1] +
                  direccionSeleccionada[1],
              ],
            ];
          });
        } else {
          // si no cumple con la dirección, eliminar la última letra
          setSelectedArea((prev) => {
            return prev.slice(0, prev.length - 1);
          });
        }
      } else {
        // si es que no es diferente y la penúltima letra es la misma que la actual, eliminar la última letra
        if (
          selectedArea.length > 1 &&
          JSON.stringify(selectedArea[selectedArea.length - 2]) ===
            JSON.stringify([index, _index])
        ) {
          setSelectedArea((prev) => {
            return prev.slice(0, prev.length - 1);
          });
        }
      }
    }
  };

  // Maneja cuando se suelta el click
  const handlerMouseUp = (e) => {
    setInSelection(false);
    const solucionCorrecta = JSON.stringify(
      selectedArea.map(([i, _i]) => sopaArray[i][_i]).join("")
    );
    setSelectedArea([]);
  };

  return (
    <div className={style.Container} onMouseUp={handlerMouseUp} {...props}>
      {sopaArray.map((row, index) => (
        <div key={index} className={style.row}>
          {row.map((letter, _index) => (
            <Letra
              onMouseDown={handlerMouseDown}
              onMouseOver={handlerMouseOver}
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
