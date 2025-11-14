import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createListPage({
  path: "pokedex",
  getList: "getPokedexList",
});

export const { generateMetadata } = Page;
export default Page;
