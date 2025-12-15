import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineDetailPage("encounter-method");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type EncounterMethod */
  const encounterMethod = context.data;

  return tabs(Page.tabs.names(encounterMethod.names));
});
