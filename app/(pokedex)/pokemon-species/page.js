import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineListPage("pokemon-species");

export const { generateMetadata } = Page;
export default Page;
