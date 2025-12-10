import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("move-ailment");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type MoveAilment */
  const moveAilment = context.data;

  return tabs(
    Page.tabs.names(moveAilment.names),
    Page.tabs.moves(moveAilment.moves)
  );
});
