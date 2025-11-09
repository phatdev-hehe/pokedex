import { split } from "change-case";
import deromanize from "deromanize";
import { titleCase as titleCase1 } from "title-case";

export const titleCase = (input = "") =>
  split(titleCase1(input))
    .map((word) => (Number.isNaN(deromanize(word)) ? word : word.toUpperCase()))
    .join(" ");

export const randomItem =
  // https://1loc.completejavascript.com/snippets/random/get-a-random-item-from-an-array
  (arr) => arr[(Math.random() * arr.length) | 0];
