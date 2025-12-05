import { highlighter, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("location", {
  staticLimit: 100,
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Location1 */
  const location = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter("The region this location can be found in.", "region"),
          titleCase(location.region.name),
        ],
      ])}
      {tabs(
        Page.tabs.names(location.names),
        Page.tabs.gameIndices(location.game_indices),
        [
          "areas",
          table.pagination(location.areas, {
            renderRows: ({ context }) => [titleCase(context.name)],
          }),
        ]
      )}
    </>
  );
});
