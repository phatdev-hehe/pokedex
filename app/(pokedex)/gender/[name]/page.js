import { descriptionList, highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("gender");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Gender */
  const gender = context.data;

  return tabs({
    pokemon_species_details: table.pagination(gender.pokemon_species_details, {
      renderRows: ({ context }) => [
        <Link href={`/pokemon-species/${context.pokemon_species.name}`}>
          {titleCase(context.pokemon_species.name)}
        </Link>,
        context.rate,
      ],
      thead: [undefined, "rate"],
    }),
    required_for_evolution: (
      <>
        {descriptionList(
          undefined,
          highlighter(
            "A list of Pokémon species that required this gender in order for a Pokémon to evolve into them.",
            "Pokémon species"
          )
        )}
        {table.pagination(gender.required_for_evolution, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon-species/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        })}
      </>
    ),
  });
});
