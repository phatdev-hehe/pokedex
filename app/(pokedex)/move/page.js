import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createCollectionPage({
  path: "move",
  getList: "getMovesList",
});

export const { generateMetadata } = Page;
export default Page;
