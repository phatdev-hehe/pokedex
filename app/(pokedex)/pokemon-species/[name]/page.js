import { Pokedex } from "@/shared/pokedex-promise-v2";

const { generateMetadata, generateStaticParams, withData } =
  await Pokedex.createPage({
    getList: "getPokemonSpeciesList",
    getData: "getPokemonSpeciesByName",
    metadataTitleSuffix: "Pokémon species",
  });

export { generateMetadata, generateStaticParams };

export default withData(
  /** @param {{ data: PokemonSpecies }} */
  ({ data: pokemonSpecies }) => pokemonSpecies.base_happiness
);
