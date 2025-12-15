import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("version");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Version */
  const version = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The version group this version belongs to.",
            "version group"
          ),
          <Link href={`/version-group/${version.version_group.name}`}>
            {titleCase(version.version_group.name)}
          </Link>,
        ],
      ])}
      {tabs(Page.tabs.names(version.names))}
    </>
  );
});
