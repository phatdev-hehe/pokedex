import { highlighter, Link, table } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";

const Page = await Pokedex.createDetailPage("generation");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Generation */
  const generation = context.data;

  return (
    <>
      {table(undefined, [
        ["Id", generation.id],
        [
          highlighter(
            "The main region travelled in this generation.",
            "main region"
          ),
          titleCase(generation.main_region.name),
        ],
      ])}
      {Page.tabs(
        Page.tabs.names(generation.names),
        [
          "abilities",
          table.pagination(generation.abilities, {
            renderFirstItem: ({ context }) => (
              <Link href={`/ability/${context.name}`}>
                {titleCase(context.name)}
              </Link>
            ),
          }),
        ],
        Page.tabs.moves(generation.moves),
        Page.tabs.pokemonSpecies(generation.pokemon_species),
        [
          "types",
          table.pagination(generation.types, {
            renderFirstItem: ({ context }) => (
              <Link href={`/type/${context.name}`}>
                {titleCase(context.name)}
              </Link>
            ),
          }),
        ],
        Page.tabs.versionGroups(generation.version_groups)
      )}
    </>
  );
});
