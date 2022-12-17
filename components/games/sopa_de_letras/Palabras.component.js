import Letra from "./Letra.component";
import style from "./Palabras.module.css";
export default function Palabras({ palabras }) {
  const wordsSize = palabras.reduce((max, { palabra }) => {
    return palabra.length > max ? palabra.length : max;
  }, 0);
  return (
    <div className={style.Container}>
      <div className={style.Title}>Palabras</div>
      {palabras.map((palabra, index) => (
        <div
          key={index}
          className={style.Palabra}
          style={{
            background: palabra.isCorrect ? "#033" : "var(--c03)",
          }}
        >
          {palabra.palabra.split("").map((letra, index) => (
            <Letra key={index} size={30} isCorrect={palabra.isCorrect}>
              {letra}
            </Letra>
          ))}
          {[...Array(wordsSize - palabra.palabra.length)].map((_, index) => (
            <Letra key={index} size={30} isCorrect={false}>
              {" "}
            </Letra>
          ))}
        </div>
      ))}
    </div>
  );
}
