import { randomItem } from "@/shared/1loc.com";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { redirect } from "next/navigation";

const pokemonNames = (await Pokedex.getPokemonsList()).results.map(
  (pokemon) => pokemon.name
);

export default () => {
  redirect(`/pokemon/${randomItem(pokemonNames)}`);
};
