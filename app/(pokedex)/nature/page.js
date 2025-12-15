import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineListPage("nature");

export const { generateMetadata } = Page;
export default Page;
