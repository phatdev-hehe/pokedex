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
          titleCase(berryFlavor.contest_type.name),
        ],
      ])}
      {tabs(Page.tabs.names(berryFlavor.names), [
        "berries",
        table.pagination(berryFlavor.berries, {
          thead: [undefined, "potency"],
          renderFirstItem: ({ context }) => (
            <Link href={`/berry/${context.berry.name}`}>
              {titleCase(context.berry.name)}
            </Link>
          ),
          renderItems: ({ context }) => [context.potency],
        }),
      ])}
    </>
  );
});
