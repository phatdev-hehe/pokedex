import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createCollectionPage({
  path: "pokemon",
  getList: "getPokemonsList",
});

export const { generateMetadata } = Page;
export default Page;
