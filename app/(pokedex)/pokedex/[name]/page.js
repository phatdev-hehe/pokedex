import {
  Checkbox,
  highlighter,
  Link,
  table,
  tabs,
} from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils";
import { getLanguageName } from "@/(shared)/utils/get-language-name";

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
        [
          "descriptions",
          "The description of this resource listed in different languages.",
          table(
            [undefined, "language"],
            pokedex.descriptions.map((description) => [
              description.description,
              getLanguageName(description.language.name),
            ])
          ),
        ],
        [
          "pokemon_entries",
          "A list of Pokémon catalogued in this Pokédex and their indexes.",
          table(
            [undefined, "entry_number"],
            pokedex.pokemon_entries.map((pokemonEntry) => [
              <Link
                href={`/pokemon-species/${pokemonEntry.pokemon_species.name}`}
              >
                {titleCase(pokemonEntry.pokemon_species.name)}
              </Link>,
              pokemonEntry.entry_number,
            ])
          ),
        ],
        [
          "version_groups",
          "A list of version groups this Pokédex is relevant to.",
          tabs.paginate(pokedex.version_groups, (versionGroup) =>
            titleCase(versionGroup.name)
          ),
        ]
      )}
    </>
  );
});
