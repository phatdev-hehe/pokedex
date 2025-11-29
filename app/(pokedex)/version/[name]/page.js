import { highlighter, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("version");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Version */
  const version = context.data;

  return (
    <>
      {table(undefined, [
        ["Id", version.id],
        [
          highlighter(
            "The version group this version belongs to.",
            "version group"
          ),
          titleCase(version.version_group.name),
        ],
      ])}
      {tabs(Page.tabs.names(version.names))}
    </>
  );
});
