import { Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("pokeathlon-stat");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokeathlonStat */
  const pokeathlonStat = context.data;

  return tabs({
    affecting_natures: tabs(
      Object.fromEntries(
        Object.entries(pokeathlonStat.affecting_natures).map(([key, value]) => [
          key,
          table.pagination(value, {
            renderRows: ({ context }) => [
              <Link href={`/nature/${context.nature.name}`}>
                {titleCase(context.nature.name)}
              </Link>,
              context.max_change,
            ],
            thead: [undefined, "max_change"],
          }),
        ])
      )
    ),
    ...Page.tabs.names(pokeathlonStat.names),
  });
});
