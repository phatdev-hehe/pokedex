import { RandomRedirect } from "@/shared/components/random-redirect";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { DocsBody } from "fumadocs-ui/page";

const pokemonNames = (await Pokedex.api.getPokemonsList()).results.map(
  (pokemon) => pokemon.name
);

export default () => (
  <DocsBody>
    <RandomRedirect path="pokemon" items={pokemonNames} />
  </DocsBody>
);
