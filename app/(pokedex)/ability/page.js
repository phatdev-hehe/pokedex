import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createListPage({
  path: "ability",
  getList: "getAbilitiesList",
});

export const { generateMetadata } = Page;
export default Page;
