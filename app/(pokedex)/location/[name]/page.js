import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("location", {
  staticLimit: process.env.DEFAULT_STATIC_LIMIT,
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokedexLocation */
  const location = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter("The region this location can be found in.", "region"),
          <Link href={`/region/${location.region.name}`}>
            {titleCase(location.region.name)}
          </Link>,
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
