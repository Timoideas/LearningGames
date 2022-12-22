import formatSeconds from "libraries/global/formatSeconds";
import { useEffect, useState } from "react";
export default function useTemporizador({
  tiempo: inicio = 180000,
  fin = 0,
  events = [{ tiempo: 900, action: () => {} }],
}) {
  const [start, setStart] = useState(false);
  const [restart, setRestart] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(
    startTime ? inicio - (new Date().getTime() - startTime) : inicio
  );
  useEffect(() => {
    if (start) {
      setStartTime(new Date().getTime());
    }
    return () => {};
  }, [start]);
  useEffect(() => {
    // guardar la hora actual en el localStorage
    localStorage.setItem("tiempo", new Date().getTime());
    if (start && restart) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    setStartTime(new Date().getTime());
  }, [restart]);
  const iniciar = () => {
    setStart(true);
    setRestart(true);
  };
  // y otra para detenerlo
  const pausar = () => {
    setRestart(!restart);
  };
  const reiniciar = () => {
    setStart(false);
    setRestart(false);
    setCurrentTime(inicio);
  };

  return {
    tiempo: {
      inicio: formatSeconds(inicio),
      actual: formatSeconds(currentTime),
      resto: formatSeconds(currentTime - fin),
      transcurrido: formatSeconds(inicio - currentTime),
      fin: formatSeconds(fin),
    },
    constroles: {
      iniciar,
      pausar,
      reiniciar,
    },
    isFinished: currentTime <= fin,
  };
}
