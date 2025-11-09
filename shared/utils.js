import { noCase, split } from "change-case";
import deromanize from "deromanize";
import removeAccents from "remove-accents";
import { titleCase as titleCase1, WORD_SEPARATORS } from "title-case";

const titleCaseOptions = {
  wordSeparators: new Set(["_", ...WORD_SEPARATORS]),
};

export const titleCase = (input = "") =>
  split(titleCase1(input, titleCaseOptions))
    .map((word) =>
      Number.isNaN(deromanize(word))
        ? {
            pokemon: "Pokémon",
            pokedex: "Pokédex",
          }[noCase(removeAccents(word))] ?? word
        : word.toUpperCase()
    )
    .join(" ");

export const randomItem =
  // https://1loc.completejavascript.com/snippets/random/get-a-random-item-from-an-array
  (arr) => arr[(Math.random() * arr.length) | 0];
