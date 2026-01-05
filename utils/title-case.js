import { noCase, split } from "change-case";
import deromanize from "deromanize";
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
        Number.isNaN(deromanize(word))
          ? terms[noCase(removeAccents(word))] ?? word
          : word.toUpperCase()
      )
      .join(" ");
  } catch {}
};
