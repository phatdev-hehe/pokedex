import { Checkbox, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";
import Link from "next/link";

const Page = await Pokedex.createPage({
  getList: "getPokedexList",
  getData: "getPokedexByName",
  titleSuffix: "pokedex",
});

export const generateMetadata = Page.generateMetadata;
export const generateStaticParams = Page.generateStaticParams;

export default Page.withData(({ data }) => {
  /** @type Pokedex */
  const pokedex = data;

  return (
    <>
      {table(undefined, [
        ["Id", pokedex.id],
        [
          "Whether or not this Pokédex originated in the main series of the video games.",
          <Checkbox checked={pokedex.is_main_series} />,
        ],
        [
          "The region this Pokédex catalogues Pokémon for.",
          titleCase(pokedex.region.name),
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
              description.language.name,
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
          table(
            undefined,
            pokedex.version_groups.map((versionGroup) => [
              titleCase(versionGroup.name),
            ])
          ),
        ]
      )}
    </>
  );
});
