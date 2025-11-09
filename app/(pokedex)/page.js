import { Pokedex } from "@/shared/pokedex-promise-v2";
import { RandomRedirect } from "@/shared/random-redirect";

const pokemonNames = (await Pokedex.api.getPokemonsList()).results.map(
  (pokemon) => pokemon.name
);

export default () => {
  return <RandomRedirect path="pokemon" items={pokemonNames} />;
};
