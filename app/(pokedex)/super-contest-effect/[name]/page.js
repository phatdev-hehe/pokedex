import { highlighter, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("super-contest-effect");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type SuperContestEffect */
  const superContestEffect = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The level of appeal this super contest effect has.",
            "appeal"
          ),
          superContestEffect.appeal,
        ],
      ])}
      {tabs(
        Page.tabs.flavorTextEntries(superContestEffect.flavor_text_entries),
        Page.tabs.moves(superContestEffect.moves)
      )}
    </>
  );
});
