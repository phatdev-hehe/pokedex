import { RandomRedirect } from "@/components/random-redirect";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { DocsBody } from "fumadocs-ui/page";

export default async () => (
  <DocsBody>
    <RandomRedirect
      links={(await Pokedex.api.getPokemonsList()).results.map(
        (pokemon) => `/pokemon/${pokemon.name}`
      )}
    />
  </DocsBody>
);
