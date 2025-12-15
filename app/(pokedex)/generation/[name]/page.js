import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("generation");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Generation */
  const generation = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The main region travelled in this generation.",
            "main region"
          ),
          <Link href={`/region/${generation.main_region.name}`}>
            {titleCase(generation.main_region.name)}
          </Link>,
        ],
      ])}
      {tabs({
        abilities: table.pagination(generation.abilities, {
          renderRows: ({ context }) => [
            <Link href={`/ability/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        types: table.pagination(generation.types, {
          renderRows: ({ context }) => [
            <Link href={`/type/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...Page.tabs.moves(generation.moves),
        ...Page.tabs.names(generation.names),
        ...Page.tabs.pokemonSpecies(generation.pokemon_species),
        ...Page.tabs.versionGroups(generation.version_groups),
      })}
    </>
  );
});
