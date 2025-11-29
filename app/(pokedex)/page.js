import { RandomRedirect } from "@/components/random-redirect";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { DocsBody } from "fumadocs-ui/page";

const RandomRedirectProps = {
  items: (await Pokedex.api.getPokemonsList()).results.map(
    (pokemon) => `/pokemon/${pokemon.name}`
  ),
};

export default () => (
  <DocsBody>
    <RandomRedirect {...RandomRedirectProps} />
  </DocsBody>
);
