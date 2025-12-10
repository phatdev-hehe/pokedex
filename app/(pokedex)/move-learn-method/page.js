import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createListPage("move-learn-method");

export const { generateMetadata } = Page;
export default Page;
