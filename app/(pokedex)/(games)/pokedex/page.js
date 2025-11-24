import { Pokedex } from "@/(shared)/pokedex-promise-v2";

const Page = await Pokedex.createCollectionPage("pokedex");

export const { generateMetadata } = Page;
export default Page;
