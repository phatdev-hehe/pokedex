import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createListPage("version-group");

export const { generateMetadata } = Page;
export default Page;
