import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("version-group");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type VersionGroup */
  const versionGroup = context.data;

  return (
    <>
      {table(undefined, [
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
      {tabs({
        move_learn_methods: table.pagination(versionGroup.move_learn_methods, {
          renderRows: ({ context }) => [
            <Link href={`/move-learn-method/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        pokedexes: table.pagination(versionGroup.pokedexes, {
          renderRows: ({ context }) => [
            <Link href={`/pokedex/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        regions: table.pagination(versionGroup.regions, {
          renderRows: ({ context }) => [
            <Link href={`/region/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        versions: table.pagination(versionGroup.versions, {
          renderRows: ({ context }) => [
            <Link href={`/version/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
      })}
    </>
  );
});
