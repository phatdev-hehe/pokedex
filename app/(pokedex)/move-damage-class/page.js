import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createListPage("move-damage-class");

export const { generateMetadata } = Page;
export default Page;
