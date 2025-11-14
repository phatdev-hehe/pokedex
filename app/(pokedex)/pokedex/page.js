import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createCollectionPage({
  path: "pokedex",
  getList: "getPokedexList",
});

export const { generateMetadata } = Page;
export default Page;
