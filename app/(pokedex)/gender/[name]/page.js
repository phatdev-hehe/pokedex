import { Link, table } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";

const Page = await Pokedex.createListPage("gender");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Gender */
  const gender = context.data;

  return Page.tabs(
    [
      "pokemon_species_details",
      "A list of Pokémon species that can be this gender and how likely it is that they will be.",
      table.pagination(gender.pokemon_species_details, {
        thead: [undefined, "rate"],
        renderFirstItem: ({ context }) => (
          <Link href={`/pokemon-species/${context.pokemon_species.name}`}>
            {titleCase(context.pokemon_species.name)}
          </Link>
        ),
        renderItems: ({ context }) => [context.rate],
      }),
    ],
    [
      "required_for_evolution",
      "A list of Pokémon species that required this gender in order for a Pokémon to evolve into them.",
      table.pagination(gender.required_for_evolution, {
        renderFirstItem: ({ context }) => (
          <Link href={`/pokemon-species/${context.name}`}>
            {titleCase(context.name)}
          </Link>
        ),
      }),
    ]
  );
});
