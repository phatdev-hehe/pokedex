import { highlighter, table, tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("super-contest-effect");

export const { generateStaticParams } = Page;

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
      {tabs({
        moves: table.pagination(superContestEffect.moves, {
          renderRows: ({ context }) => [
            <Link href={`/move/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...Page.tabs.flavorTextEntries(superContestEffect.flavor_text_entries),
      })}
    </>
  );
});
