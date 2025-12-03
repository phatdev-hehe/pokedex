import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createListPage("encounter-condition");

export const { generateMetadata } = Page;
export default Page;
