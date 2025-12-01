import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("version-group");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type VersionGroup */
  const versionGroup = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "Order for sorting. Almost by date of release, except similar versions are grouped together.",
            "Order"
          ),
          versionGroup.order,
        ],
        [
          highlighter(
            "The generation this version was introduced in.",
            "generation"
          ),
          <Link href={`/generation/${versionGroup.generation.name}`}>
            {titleCase(versionGroup.generation.name)}
          </Link>,
        ],
      ])}
      {tabs(
        [
          "move_learn_methods",
          table.pagination(versionGroup.move_learn_methods, {
            renderFirstItem: ({ context }) => titleCase(context.name),
          }),
        ],
        [
          "pokedexes",
          table.pagination(versionGroup.pokedexes, {
            renderFirstItem: ({ context }) => (
              <Link href={`/pokedex/${context.name}`}>
                {titleCase(context.name)}
              </Link>
            ),
          }),
        ],
        [
          "regions",
          table.pagination(versionGroup.regions, {
            renderFirstItem: ({ context }) => titleCase(context.name),
          }),
        ],
        [
          "versions",
          table.pagination(versionGroup.versions, {
            renderFirstItem: ({ context }) => (
              <Link href={`/version/${context.name}`}>
                {titleCase(context.name)}
              </Link>
            ),
          }),
        ]
      )}
    </>
  );
});
