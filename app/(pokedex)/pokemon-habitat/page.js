import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineListPage("pokemon-habitat");

export const { generateMetadata } = Page;
export default Page;
