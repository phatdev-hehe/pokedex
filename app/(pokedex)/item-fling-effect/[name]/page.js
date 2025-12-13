import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("item-fling-effect");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type ItemFlingEffect */
  const itemFlingEffect = context.data;

  return tabs({
    ...Page.tabs.effectEntries(itemFlingEffect.effect_entries),
    ...Page.tabs.items(itemFlingEffect.items),
  });
});
