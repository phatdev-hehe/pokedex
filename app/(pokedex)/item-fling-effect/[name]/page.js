import { table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("item-fling-effect");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type ItemFlingEffect */
  const itemFlingEffect = context.data;

  return tabs(
    [
      "effect_entries",
      table.pagination(itemFlingEffect.effect_entries, {
        renderRows: ({ context }) => [
          context.effect,
          <Pokedex.LanguageLink language={context.language} />,
        ],
      }),
    ],
    Page.tabs.items(itemFlingEffect.items)
  );
});
