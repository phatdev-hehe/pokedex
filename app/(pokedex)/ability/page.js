import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createCollectionPage({
  path: "ability",
  getList: "getAbilitiesList",
});

export const { generateMetadata } = Page;
export default Page;
