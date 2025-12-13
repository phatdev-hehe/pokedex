import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("move-damage-class");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type MoveDamageClass */
  const moveDamageClass = context.data;

  return tabs({
    ...Page.tabs.descriptions(moveDamageClass.descriptions),
    ...Page.tabs.moves(moveDamageClass.moves),
    ...Page.tabs.names(moveDamageClass.names),
  });
});
