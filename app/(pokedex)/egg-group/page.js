import { Pokedex } from "@/(shared)/pokedex-promise-v2";

const Page = await Pokedex.createCollectionPage("egg-group");

export const { generateMetadata } = Page;
export default Page;
