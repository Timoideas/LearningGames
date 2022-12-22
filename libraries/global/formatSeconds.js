/**

*/
// Esta función creará y devolverá un Hora Formateada en String.
export default function formatSeconds(seconds = 500) {
  // devolver un string así: "00:00:00"
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
}
