import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineListPage("pokedex");

export const { generateMetadata } = Page;
export default Page;
