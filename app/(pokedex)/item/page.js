import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createCollectionPage({
  path: "item",
  getList: "getItemsList",
});

export const { generateMetadata } = Page;
export default Page;
