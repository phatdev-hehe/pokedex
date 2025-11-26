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
          "A list of abilities that were introduced in this generation.",
          table.pagination(generation.abilities, {
            renderFirstItem: ({ context }) => (
              <Link href={`/ability/${context.name}`}>
                {titleCase(context.name)}
              </Link>
            ),
          }),
        ],
        Page.tabs.moves(generation.moves, {
          description:
            "A list of moves that were introduced in this generation.",
        }),
        Page.tabs.pokemonSpecies(generation.pokemon_species, {
          description:
            "A list of Pokémon species that were introduced in this generation.",
        }),
        [
          "types",
          "A list of types that were introduced in this generation.",
          table.pagination(generation.types, {
            renderFirstItem: ({ context }) => (
              <Link href={`/type/${context.name}`}>
                {titleCase(context.name)}
              </Link>
            ),
          }),
        ],
        Page.tabs.versionGroups(generation.version_groups, {
          description:
            "A list of version groups that were introduced in this generation.",
        })
      )}
    </>
  );
});
