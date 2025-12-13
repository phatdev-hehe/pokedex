import { Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("item-pocket");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type ItemPocket */
  const itemPocket = context.data;

  return tabs({
    categories: table.pagination(itemPocket.categories, {
      renderRows: ({ context }) => [
        <Link href={`/item-category/${context.name}`}>
          {titleCase(context.name)}
        </Link>,
      ],
    }),
    ...Page.tabs.names(itemPocket.names),
  });
});
