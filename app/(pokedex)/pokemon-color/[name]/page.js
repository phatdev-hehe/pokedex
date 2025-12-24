import { tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("pokemon-color");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokemonColor */
  const pokemonColor = context.data;

  return tabs({
    pokemon_species: table.pagination(pokemonColor.pokemon_species, {
      renderRows: ({ context }) => [
        <Link href={`/pokemon-species/${context.name}`}>
          {titleCase(context.name)}
        </Link>,
      ],
    }),
    ...Page.tabs.names(pokemonColor.names),
  });
});
