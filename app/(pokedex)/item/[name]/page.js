import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createPage({
  getList: "getItemsList",
  getData: "getItemByName",
  titleSuffix: "item",
  getAvatar: ({ data }) => {
    /** @type Item */
    const item = data;

    return item.sprites.default;
  },
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page.withData(({ data }) => {
  /** @type Item */
  const item = data;

  return <Page.Root></Page.Root>;
});
