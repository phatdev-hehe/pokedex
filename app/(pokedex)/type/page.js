import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createListPage({
  path: "type",
  getList: "getTypesList",
});

export const { generateMetadata } = Page;
export default Page;
