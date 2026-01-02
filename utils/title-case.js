import { noCase, split } from "change-case";
import deromanize from "deromanize";
import { isNumber } from "es-toolkit/compat";
import removeAccents from "remove-accents";
import { titleCase as titleCase1, WORD_SEPARATORS } from "title-case";

const options = {
  wordSeparators: new Set(["_", ...WORD_SEPARATORS]),
};

const terms = {
  pokedex: "Pokédex",
  pokemon: "Pokémon",
};

export const titleCase = (input) => {
  try {
    return split(titleCase1(input, options))
      .map((word) =>
        isNumber(deromanize(word))
          ? word.toUpperCase()
          : terms[noCase(removeAccents(word))] ?? word
      )
      .join(" ");
  } catch {}
};
