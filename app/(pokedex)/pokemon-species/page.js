import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createListPage({
  path: "pokemon-species",
  getList: "getPokemonSpeciesList",
});

export const { generateMetadata } = Page;
export default Page;
