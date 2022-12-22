/**
 * Este archivo contiene la lógica para crear una sopa de letras.
 * @param {Array} palabras - Arreglo de palabras a incluir en la sopa de letras.
 * @param {String} nivel - Nivel de dificultad de la sopa de letras.
 * @returns {Object} - Objeto con la sopa de letras y la solución.
 * @example
 * const { sopa_de_letras, solucion } = CreateSopaDeLetras({
 *  palabras: ["hola", "mundo"],
 * nivel: "facil",
 * });
 * console.log(sopa_de_letras);
 * console.log(solucion);
 *
 */
// Esta función creará y devolverá una sopa de letras
export default function SopaDeLetras({ palabras = [], nivel = "facil" }) {
  // Sopa de letras: []
  const sopa_de_letras = [];
  // Solución: []
  let solucion = [];
  // Palabras en mayúsculas: a -> A
  palabras = palabras.map((word) => word.toUpperCase());
  // Tamaño de la sopa de letras: palabra más larga + relleno: max 23
  let size =
    palabras.reduce((a, b) => (a.length > b.length ? a : b)).length + 3;

  // Letras a rellenar: "LETRASDELARREGLODEPALABRAS"
  let fillLetters = palabras.join("");
  // Signos gramaticales incluidos en las palabras: "ÁÉÍÓÚÜ"
  let marksIncluded =
    palabras
      .join("")
      .match(/[\u00C0-\u00FF]/g)
      .join("") || "";
  let vocales = "AEIOU";
  // Establece las direcciones en las que se pueden dirigir las palabras
  let directions = {
    // horizontal este
    HE: [0, 1],
    // horizontal oeste
    HO: [0, -1],
    // vertical norte
    VN: [-1, 0],
    // vertical sur
    VS: [1, 0],
  };
  let midDirs, hardDirs;
  // Establecer valores según el nivel
  switch (nivel) {
    case "facil":
      solucion = palabras.map((word, index) => {
        // Elejir aleatoriamente una dirección
        const dir =
          Object.values(directions)[
            Math.floor(Math.random() * Object.keys(directions).length)
          ];
        // Obtener el tamaño de la palabra
        const wordLength = word.length;
        // obtener un número aleatorio entre 0 y el tamaño de la sopa de letras menos el tamaño de la palabra
        const randomPos = Math.floor(Math.random() * (size - wordLength));
        // Obtener las posiciones de la palabra según la dirección elegida
        let [posX, posY] = dir.map((value) => {
          let pos = value * wordLength;
          pos = !!pos
            ? pos > 0
              ? randomPos
              : randomPos + wordLength
            : Math.floor(Math.random() * size);
          return pos;
        });
        // Arreglo vacío para almacenar las posiciones de cada letra de la palabra
        const wordArray = [];
        // Recorrer la palabra para obtener las posiciones de cada letra
        for (let i = 0; i < word.length; i++) {
          // Crear un arreglo con las posiciones de cada letra de la palabra según la dirección elegida
          wordArray.push([posX + dir[0] * i, posY + dir[1] * i]);
        }
        return { [word]: [wordArray] };
      });
      console.log(solucion);
      break;
    case "medio":
      size += 5;
      fillLetters = fillLetters.repeat(2);
      marksIncluded = marksIncluded.repeat(2);
      vocales = vocales.repeat(2);
      midDirs = {
        // diagonal noreste
        DNE: [-1, 1],
        // diagonal sureste
        DSE: [1, 1],
      };
      directions = {
        ...directions,
        ...midDirs,
      };
      break;
    case "dificil":
      size += 7;
      fillLetters = fillLetters.repeat(4);
      marksIncluded = marksIncluded.repeat(4);
      vocales = vocales.repeat(4);
      hardDirs = {
        // diagonal noroeste
        DNO: [-1, -1],
        // diagonal suroeste
        DSO: [1, -1],
      };
      directions = {
        ...directions,
        ...midDirs,
        ...hardDirs,
      };
      break;
    default:
      relleno = 1;
  }
  size = size <= 23 ? size : 23;
  // Función que genera una letra aleatoria
  const getRandomLetter = () => {
    const letters = `BCDEFGHJKLMNÑPQRSTVWXYZ${vocales}${fillLetters}${marksIncluded}`;
    return letters[Math.floor(Math.random() * letters.length)];
  };

  // Arma la sopa de letras
  for (let i = 0; i < size; i++) {
    sopa_de_letras.push([]);
    for (let j = 0; j < size; j++) {
      sopa_de_letras[i].push(getRandomLetter());
    }
  }
  // Agrega las palabras direccionadas a la sopa de letras
  solucion.forEach((word) => {
    const wordKey = Object.keys(word)[0];
    const wordValue = word[wordKey];
    wordValue.forEach((wordArray) => {
      wordArray.forEach((cell, index) => {
        sopa_de_letras[cell[0]][cell[1]] = wordKey[index];
      });
    });
  });

  return {
    sopa_de_letras,
    solucion,
  };
}
