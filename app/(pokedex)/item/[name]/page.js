import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("item", (context) => {
  /** @type Item */
  const item = context.data;

  return item.sprites.default;
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page.withContext((context) => {
  /** @type Item */
  const item = context.data;
});
