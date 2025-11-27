import { Pokedex } from "@/(shared)/pokedex-promise-v2";

const Page = await Pokedex.createListPage("pokemon-shape");

export const { generateMetadata } = Page;
export default Page;
