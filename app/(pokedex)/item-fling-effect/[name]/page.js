import { table, tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("item-fling-effect");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type ItemFlingEffect */
  const itemFlingEffect = context.data;

  return tabs({
    items: table.pagination(itemFlingEffect.items, {
      renderRows: ({ context }) => [
        <Link href={`/item/${context.name}`}>{titleCase(context.name)}</Link>,
      ],
    }),
    ...Page.tabs.effectEntries(itemFlingEffect.effect_entries),
  });
});
