import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("move-learn-method");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type MoveLearnMethod */
  const moveLearnMethod = context.data;

  return tabs({
    ...Page.tabs.descriptions(moveLearnMethod.descriptions),
    ...Page.tabs.names(moveLearnMethod.names),
    ...Page.tabs.versionGroups(moveLearnMethod.version_groups),
  });
});
