import { table } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("pokemon-shape");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokemonShape */
  const pokemonShape = context.data;

  return (
    <>
      {table(undefined, [["Id", pokemonShape.id]])}
      {Page.tabs(
        Page.tabs.names(pokemonShape.names),
        [
          "awesome_names",
          table.pagination(pokemonShape.awesome_names, {
            thead: [undefined, "language"],
            renderFirstItem: ({ context }) => context.awesome_name,
            renderItems: ({ context }) => [
              <Pokedex.LanguageLink code={context.language.name} />,
            ],
          }),
        ],
        Page.tabs.pokemonSpecies(pokemonShape.pokemon_species)
      )}
    </>
  );
});
