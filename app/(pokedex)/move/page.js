import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineListPage("move");

export const { generateMetadata } = Page;
export default Page;
