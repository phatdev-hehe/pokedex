import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineDetailPage("move-category");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type MoveCategory */
  const moveCategory = context.data;

  return tabs({
    ...Page.tabs.descriptions(moveCategory.descriptions),
    ...Page.tabs.moves(moveCategory.moves),
  });
});
