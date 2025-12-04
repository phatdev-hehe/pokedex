import { highlighter, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("item-category");

export const { generateMetadata, generateStaticParams } = Page;

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
          titleCase(itemCategory.pocket.name),
        ],
      ])}
      {tabs(
        Page.tabs.names(itemCategory.names),
        Page.tabs.items(itemCategory.items)
      )}
    </>
  );
});
