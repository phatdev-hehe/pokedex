import { Pokedex } from "@/shared/pokedex-promise-v2";
import { RandomRedirect } from "@/shared/random-redirect";
import { DocsBody } from "fumadocs-ui/page";

const pokemonNames = (await Pokedex.api.getPokemonsList()).results.map(
  (pokemon) => pokemon.name
);

export default () => (
  <DocsBody>
    <RandomRedirect path="pokemon" items={pokemonNames} />
  </DocsBody>
);
