import { Checkbox, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";
import Link from "next/link";

const Page = await Pokedex.createDetailPage("ability");

export const { generateMetadata, generateStaticParams } = Page;

export default Page.withContext((context) => {
  /** @type Ability */
  const ability = context.data;

  return (
    <Page.Root>
      {table(undefined, [
        ["Id", ability.id],
        [
          "The generation this ability originated in.",
          titleCase(ability.generation.name),
        ],
        [
          "Whether or not this ability originated in the main series of the video games.",
          <Checkbox checked={ability.is_main_series} />,
        ],
      ])}
      {Page.tabs(
        Page.tabs.names(ability.names),
        [
          "pokemon",
          "A list of Pokémon that could potentially have this ability.",
          table(
            [undefined, "slot", "hidden"],
            ability.pokemon.map((abilityPokemon) => [
              <Link href={`/pokemon/${abilityPokemon.pokemon.name}`}>
                {titleCase(abilityPokemon.pokemon.name)}
              </Link>,
              abilityPokemon.slot,
              <Checkbox checked={abilityPokemon.is_hidden} />,
            ])
          ),
        ],
        Page.tabs.effectChanges(
          ability.effect_changes,
          "The list of previous effects this ability has had across version groups."
        ),
        Page.tabs.effectEntries(
          ability.effect_entries,
          "The effect of this ability listed in different languages."
        ),
        Page.tabs.flavorTextEntries(
          ability.flavor_text_entries,
          "The flavor text of this ability listed in different languages."
        )
      )}
    </Page.Root>
  );
});
