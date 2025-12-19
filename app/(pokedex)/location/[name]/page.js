import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("location", {
  staticLimit: process.env.MIN_STATIC_LIMIT,
});

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokedexLocation */
  const location = context.data;

  const region = location.region?.name;

  return (
    <>
      {table(undefined, [
        [
          highlighter("The region this location can be found in.", "region"),
          <Link href={`/region/${region}`}>{titleCase(region)}</Link>,
        ],
      ])}
      {tabs({
        areas: table.pagination(location.areas, {
          renderRows: ({ context }) => [
            <Link href={`/location-area/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...Page.tabs.gameIndices(location.game_indices),
        ...Page.tabs.names(location.names),
      })}
    </>
  );
});
