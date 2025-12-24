import { table, tabs } from "@/components";
import { Link } from "@/components/link";
import { LanguageLink } from "@/components/link/language-link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("pokemon-shape");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokemonShape */
  const pokemonShape = context.data;

  return tabs({
    awesome_names: table.pagination(pokemonShape.awesome_names, {
      renderRows: ({ context }) => [
        context.awesome_name,
        <LanguageLink language={context.language} />,
      ],
      thead: [undefined, "language"],
    }),
    pokemon_species: table.pagination(pokemonShape.pokemon_species, {
      renderRows: ({ context }) => [
        <Link href={`/pokemon-species/${context.name}`}>
          {titleCase(context.name)}
        </Link>,
      ],
    }),
    ...Page.tabs.names(pokemonShape.names),
  });
});
