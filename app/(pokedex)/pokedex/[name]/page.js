import { Checkbox, highlighter, Link, table } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";

const Page = await Pokedex.createDetailPage("pokedex");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Pokedex */
  const pokedex = context.data;

  return (
    <>
      {table(undefined, [
        ["Id", pokedex.id],
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
          titleCase(pokedex.region?.name), // ??
        ],
      ])}
      {Page.tabs(
        Page.tabs.names(pokedex.names),
        Page.tabs.descriptions(pokedex.descriptions),
        [
          "pokemon_entries",
          "A list of Pokémon catalogued in this Pokédex and their indexes.",
          table.pagination(pokedex.pokemon_entries, {
            thead: [undefined, "entry_number"],
            renderFirstItem: ({ context }) => (
              <Link href={`/pokemon-species/${context.pokemon_species.name}`}>
                {titleCase(context.pokemon_species.name)}
              </Link>
            ),
            renderItems: ({ context }) => [context.entry_number],
          }),
        ],
        Page.tabs.versionGroups(pokedex.version_groups, {
          description: "A list of version groups this Pokédex is relevant to.",
        })
      )}
    </>
  );
});
