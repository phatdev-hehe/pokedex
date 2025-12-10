import { Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("pokeathlon-stat");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokeathlonStat */
  const pokeathlonStat = context.data;

  return tabs(Page.tabs.names(pokeathlonStat.names), [
    "affecting_natures",
    table.pagination(Object.entries(pokeathlonStat.affecting_natures), {
      thead: ["set", undefined],
      renderRows: ({ context }) => [
        titleCase(context[0]),
        table.pagination(context[1], {
          thead: [undefined, "max_change"],
          renderRows: ({ context }) => [
            <Link href={`/nature/${context.nature.name}`}>
              {titleCase(context.nature.name)}
            </Link>,
            context.max_change,
          ],
        }),
      ],
    }),
  ]);
});
