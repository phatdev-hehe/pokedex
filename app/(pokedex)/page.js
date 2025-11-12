import { Pokedex } from "@/shared/pokedex-promise-v2";
import { RouterActions } from "@/shared/router-actions";
import { RouterPush } from "@/shared/router-push";
import { randomItem } from "@/shared/utils";
import { Callout } from "fumadocs-ui/components/callout";
import { DocsBody } from "fumadocs-ui/page";

const pokemonNames = (await Pokedex.api.getPokemonsList()).results.map(
  (pokemon) => pokemon.name
);

export default () => {
  const href = `/pokemon/${randomItem(pokemonNames)}`;

  return (
    <DocsBody>
      <RouterPush href={href} />
      <Callout type="warn" title="Redirecting to">
        {href}
        <RouterActions />
      </Callout>
    </DocsBody>
  );
};
