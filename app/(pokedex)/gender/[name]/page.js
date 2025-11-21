import { Link, table, tabs } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils";

const Page = await Pokedex.createDetailPage("gender");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Gender */
  const gender = context.data;

  return Page.tabs(
    [
      "pokemon_species_details",
      "A list of Pokémon species that can be this gender and how likely it is that they will be.",
      table(
        [undefined, "rate"],
        gender.pokemon_species_details.map((pokemonSpeciesDetail) => [
          <Link
            href={`/pokemon-species/${pokemonSpeciesDetail.pokemon_species.name}`}
          >
            {titleCase(pokemonSpeciesDetail.pokemon_species.name)}
          </Link>,
          pokemonSpeciesDetail.rate,
        ])
      ),
    ],
    [
      "required_for_evolution",
      "A list of Pokémon species that required this gender in order for a Pokémon to evolve into them.",
      tabs.paginate(gender.required_for_evolution, (pokemonSpecies) => (
        <Link href={`/pokemon-species/${pokemonSpecies.name}`}>
          {titleCase(pokemonSpecies.name)}
        </Link>
      )),
    ]
  );
});
