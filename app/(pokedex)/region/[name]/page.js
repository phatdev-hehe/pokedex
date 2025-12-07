import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("region");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Region */
  const region = context.data;

  const mainGeneration = region.main_generation?.name;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The generation this region was introduced in.",
            "generation"
          ),
          <Link href={`/generation/${mainGeneration}`}>
            {titleCase(mainGeneration)}
          </Link>,
        ],
      ])}
      {tabs(
        Page.tabs.names(region.names),
        Page.tabs.pokedexes(region.pokedexes),
        [
          "locations",
          table.pagination(region.locations, {
            renderRows: ({ context }) => [
              <Link href={`/location/${context.name}`}>
                {titleCase(context.name)}
              </Link>,
            ],
          }),
        ],
        Page.tabs.versionGroups(region.version_groups)
      )}
    </>
  );
});
