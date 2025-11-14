import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createListPage({
  path: "stat",
  getList: "getStatsList",
});

export const { generateMetadata } = Page;
export default Page;
