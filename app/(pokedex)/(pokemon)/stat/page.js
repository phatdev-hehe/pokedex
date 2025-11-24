import { Pokedex } from "@/(shared)/pokedex-promise-v2";

const Page = await Pokedex.createListPage("stat");

export const { generateMetadata } = Page;
export default Page;
