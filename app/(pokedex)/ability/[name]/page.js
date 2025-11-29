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
        ["Id", ability.id],
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
      {tabs(
        Page.tabs.names(ability.names),
        [
          "pokemon",
          table.pagination(ability.pokemon, {
            thead: [undefined, "slot", "hidden"],
            renderFirstItem: ({ context }) => (
              <Link href={`/pokemon/${context.pokemon.name}`}>
                {titleCase(context.pokemon.name)}
              </Link>
            ),
            renderItems: ({ context }) => [
              context.slot,
              <Checkbox checked={context.is_hidden} />,
            ],
          }),
        ],
        Page.tabs.effectChanges(ability.effect_changes),
        Page.tabs.effectEntries(ability.effect_entries),
        Page.tabs.flavorTextEntries(ability.flavor_text_entries)
      )}
    </>
  );
});
