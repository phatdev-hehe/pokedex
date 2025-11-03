import { Pokedex } from "@/pokedex-promise-v2";

const { generateMetadata, generateStaticParams, withData } =
  await Pokedex.buildPage({
    getList: "getPokemonsList",
    getData: "getPokemonByName",
  });

export { generateMetadata, generateStaticParams };

export default withData(
  /** @param {{ data: Pokemon }} */
  ({ data: pokemon }) => {}
);
