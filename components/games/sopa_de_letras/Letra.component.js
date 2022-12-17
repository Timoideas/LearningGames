import style from "./Letra.module.css";
export default function Letra({
  children,
  size = 50,
  isCorrect = false,
  ...props
}) {
  const margin = Math.floor(size / 10) - 2;
  const background = isCorrect ? "#033" : "var(--c00)";
  const color = isCorrect ? "#00ff73" : "var(--c10)";
  return (
    <div
      className={style.Letter}
      style={{
        height: size,
        width: size,
        margin: margin + "px",
        background,
        color,
      }}
      {...props}
    >
      {children.toString().toUpperCase()}
    </div>
  );
}
