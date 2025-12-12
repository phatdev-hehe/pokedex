import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("berry-flavor");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type BerryFlavor */
  const berryFlavor = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The contest type that correlates with this berry flavor.",
            "contest type"
          ),
          <Link href={`/contest-type/${berryFlavor.contest_type.name}`}>
            {titleCase(berryFlavor.contest_type.name)}
          </Link>,
        ],
      ])}
      {tabs(Page.tabs.names(berryFlavor.names), [
        "berries",
        table.pagination(berryFlavor.berries, {
          renderRows: ({ context }) => [
            <Link href={`/berry/${context.berry.name}`}>
              {titleCase(context.berry.name)}
            </Link>,
            context.potency,
          ],
          thead: [undefined, "potency"],
        }),
      ])}
    </>
  );
});
