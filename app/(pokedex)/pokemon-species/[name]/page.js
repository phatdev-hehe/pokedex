import { table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";

const { generateMetadata, generateStaticParams, withData } =
  await Pokedex.createPage({
    getList: "getPokemonSpeciesList",
    getData: "getPokemonSpeciesByName",
    metadataTitleSuffix: "Pokémon Species",
  });

export { generateMetadata, generateStaticParams };

export default withData(
  /** @param {{ data: PokemonSpecies }} */
  ({ data: pokemonSpecies }) => {
    return (
      <>
        {table(
          [undefined, "Value"],
          [
            [
              "The happiness when caught by a normal Pokéball; up to 255. The higher the number, the happier the Pokémon.",
              pokemonSpecies.base_happiness,
            ],
            [
              "The base capture rate; up to 255. The higher the number, the easier the catch.",
              pokemonSpecies.capture_rate,
            ],
          ]
        )}
      </>
    );
  }
);
