import { tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("pokemon-habitat");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokemonHabitat */
  const pokemonHabitat = context.data;

  return tabs({
    pokemon_species: table.pagination(pokemonHabitat.pokemon_species, {
      renderRows: ({ context }) => [
        <Link href={`/pokemon-species/${context.name}`}>
          {titleCase(context.name)}
        </Link>,
      ],
    }),
    ...Page.tabs.names(pokemonHabitat.names),
  });
});
