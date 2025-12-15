import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineDetailPage("move-battle-style");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type MoveBattleStyle */
  const moveBattleStyle = context.data;

  return tabs(Page.tabs.names(moveBattleStyle.names));
});
