import { table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineDetailPage("contest-effect");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type ContestEffect */
  const contestEffect = context.data;

  return (
    <>
      {table(undefined, [
        [
          "The base number of hearts the user of this move gets.",
          contestEffect.appeal,
        ],
        [
          `The base number of hearts the user's opponent loses.`,
          contestEffect.jam,
        ],
      ])}
      {tabs({
        ...Page.tabs.effectEntries(contestEffect.effect_entries),
        ...Page.tabs.flavorTextEntries(contestEffect.flavor_text_entries),
      })}
    </>
  );
});
