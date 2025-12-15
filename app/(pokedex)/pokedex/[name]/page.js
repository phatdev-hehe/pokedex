import { Checkbox, highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("pokedex");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Pokedex */
  const pokedex = context.data;

  const region = pokedex.region?.name;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "Whether or not this Pokédex originated in the main series of the video games.",
            "main series"
          ),
          <Checkbox checked={pokedex.is_main_series} />,
        ],
        [
          highlighter(
            "The region this Pokédex catalogues Pokémon for.",
            "region"
          ),
          <Link href={`/region/${region}`}>{titleCase(region)}</Link>,
        ],
      ])}
      {tabs({
        pokemon_entries: table.pagination(pokedex.pokemon_entries, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon-species/${context.pokemon_species.name}`}>
              {titleCase(context.pokemon_species.name)}
            </Link>,
            context.entry_number,
          ],
          thead: [undefined, "entry_number"],
        }),
        ...Page.tabs.names(pokedex.names),
        ...Page.tabs.descriptions(pokedex.descriptions),
        ...Page.tabs.versionGroups(pokedex.version_groups),
      })}
    </>
  );
});
