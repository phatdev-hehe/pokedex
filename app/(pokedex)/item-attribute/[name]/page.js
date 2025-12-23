import { table, tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("item-attribute");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type ItemAttribute */
  const itemAttribute = context.data;

  return tabs({
    items: table.pagination(itemAttribute.items, {
      renderRows: ({ context }) => [
        <Link href={`/item/${context.name}`}>{titleCase(context.name)}</Link>,
      ],
    }),
    ...Page.tabs.descriptions(itemAttribute.descriptions),
    ...Page.tabs.names(itemAttribute.names),
  });
});
