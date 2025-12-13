import { Checkbox, highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("ability");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Ability */
  const ability = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The generation this ability originated in.",
            "generation"
          ),
          <Link href={`/generation/${ability.generation.name}`}>
            {titleCase(ability.generation.name)}
          </Link>,
        ],
        [
          highlighter(
            "Whether or not this ability originated in the main series of the video games.",
            "main series"
          ),
          <Checkbox checked={ability.is_main_series} />,
        ],
      ])}
      {tabs({
        pokemon: table.pagination(ability.pokemon, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon/${context.pokemon.name}`}>
              {titleCase(context.pokemon.name)}
            </Link>,
            <Checkbox checked={context.is_hidden} />,
            context.slot,
          ],
          thead: [undefined, "hidden", "slot"],
        }),
        ...Page.tabs.effectChanges(ability.effect_changes),
        ...Page.tabs.effectEntries(ability.effect_entries),
        ...Page.tabs.flavorTextEntries(ability.flavor_text_entries),
        ...Page.tabs.names(ability.names),
      })}
    </>
  );
});
