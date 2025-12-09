import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createListPage("contest-effect");

export const { generateMetadata } = Page;
export default Page;
