import { Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("pokeathlon-stat");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokeathlonStat */
  const pokeathlonStat = context.data;

  return tabs({
    affecting_natures: table.pagination(
      Object.entries(pokeathlonStat.affecting_natures),
      {
        renderRows: ({ context }) => [
          titleCase(context[0]),
          table.pagination(context[1], {
            renderRows: ({ context }) => [
              <Link href={`/nature/${context.nature.name}`}>
                {titleCase(context.nature.name)}
              </Link>,
              context.max_change,
            ],
            thead: [undefined, "max_change"],
          }),
        ],
        thead: ["set", undefined],
      }
    ),
    ...Page.tabs.names(pokeathlonStat.names),
  });
});
