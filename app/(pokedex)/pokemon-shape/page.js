import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineListPage("pokemon-shape");

export const { generateMetadata } = Page;
export default Page;
