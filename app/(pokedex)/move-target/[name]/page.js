import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineDetailPage("move-target");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type MoveTarget */
  const moveTarget = context.data;

  return tabs({
    ...Page.tabs.descriptions(moveTarget.descriptions),
    ...Page.tabs.moves(moveTarget.moves),
    ...Page.tabs.names(moveTarget.names),
  });
});
