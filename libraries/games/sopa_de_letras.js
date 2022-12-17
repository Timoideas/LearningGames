/**
 * Este archivo contiene la lógica para crear una sopa de letras.
 *
 */
// Esta función creará y devolverá una sopa de letras
export default function SopaDeLetras({
  palabras = [],
  relleno = 0, // esto indica cuantos espacios en blanco habrá despues de la palabra más larga.
  nivel = "facil",
}) {
  // Crearemos un array de arrays para representar la sopa de letras.
  // en Cada fila o columna se tendrá aleatoriamente una palabra.
  // El resto de las celdas estarán llenas con letras aleatorias.
  // todas las letras del crucigrama estarán en mayúsculas.
  // si el nivel es "facil" las palabras no pueden cruzarse entre si solo estarán en la orientación vertical u horizontal.
  // si el nivel es "medio" las palabras podran cruzarse entre si. es decir, una palabra puede estar en la misma fila o columna que otra.
  // si el nivel es "dificil" las palabras pueden estar en diagonal y en cualquier dirección. es decir, una palabra puede estar en la misma fila o columna que otra y también en diagonal y en cualquier dirección (vertical, horizontal, diagonal) y sus inversas (vertical-reverse, horizontal-reverse, diagonal-reverse)

  // Ejemplo:
  // palabras = ["hola", "mundo", "adios"]
  // relleno = 1
  // nivel = "difícil"
  //
  // Por ser este un ejeplo los espacios en blanco se representarán con el caracter "_"
  //
  // [
  //   ["A", "L", "O", "H", "_", "O"],
  //   ["_", "D", "_", "_", "_", "D"],
  //   ["_", "_", "I", "_", "_", "N"],
  //   ["_", "_", "_", "O", "_", "U"],
  //   ["_", "_", "_", "_", "S", "M"],
  //   ["_", "_", "_", "_", "_", "_"],
  // ]
  //  Para lograr esto es necesario crear
  // 1. una función que genere letras aleatoria (array del tamaño de la palabra más grande + el relleno; todo al cuadrado) entre la a y la z incluyendo la ñ y vocales con tilde (solo si alguna palabra tiene una vocal con tilde).
  // 2. una funcion que dependiendo al nivel (facil, medio, dificil) dedida la orientación de la palabra (vertical, horizontal, diagonal, vertical-reverse, horizontal-reverse, diagonal-reverse) y la posición de la palabra en el array de palabras, genere la palabra en la sopa de letras.
  // 3. una función que dependiendo al nivel (facil, medio, dificil) intente intersectar las palabras en la sopa de letras.
  // 4. una función que dependiendo al nivel (facil, medio, dificil) intente rellenar las celdas vacías con letras aleatorias.
  //

  // Sopa de letras: []
  const sopaDeLetras = [];
  // Palabras en mayúsculas: a -> A
  const words = palabras.map((word) => word.toUpperCase());
  // Tamaño de la sopa de letras: palabra más larga + relleno
  const size =
    words.reduce((a, b) => (a.length > b.length ? a : b)).length + relleno;
  // Signos gramaticales incluidos en las palabras: "ÁÜ"
  const marksIncluded =
    words
      .join("")
      .match(/[\u00C0-\u00FF]/g)
      .join("") || "";

  // Función que genera una letra aleatoria
  const getRandomLetter = () => {
    const letters = `ABCDEFGHIJKLMNÑOPQRSTUVWXYZ${marksIncluded}`;
    return letters[Math.floor(Math.random() * letters.length)];
  };
  // Armar la sopa de letras
  for (let i = 0; i < size; i++) {
    sopaDeLetras.push([]);
    for (let j = 0; j < size; j++) {
      sopaDeLetras[i].push(getRandomLetter());
    }
  }
  return sopaDeLetras;
}
