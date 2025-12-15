import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineDetailPage("item-attribute");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type ItemAttribute */
  const itemAttribute = context.data;

  return tabs({
    ...Page.tabs.descriptions(itemAttribute.descriptions),
    ...Page.tabs.items(itemAttribute.items),
    ...Page.tabs.names(itemAttribute.names),
  });
});
