import { Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("gender");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Gender */
  const gender = context.data;

  return tabs(
    [
      "pokemon_species_details",
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
