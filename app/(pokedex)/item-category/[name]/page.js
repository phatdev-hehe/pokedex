import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("item-category");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type ItemCategory */
  const itemCategory = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The pocket items in this category would be put in.",
            "pocket"
          ),
          <Link href={`/item-pocket/${itemCategory.pocket.name}`}>
            {titleCase(itemCategory.pocket.name)}
          </Link>,
        ],
      ])}
      {tabs({
        ...Page.tabs.items(itemCategory.items),
        ...Page.tabs.names(itemCategory.names),
      })}
    </>
  );
});
