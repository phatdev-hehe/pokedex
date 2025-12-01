import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("contest-type");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type ContestType */
  const contestType = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The berry flavor that correlates with this contest type.",
            "berry flavor"
          ),
          <Link href={`/berry-flavor/${contestType.berry_flavor.name}`}>
            {titleCase(contestType.berry_flavor.name)}
          </Link>,
        ],
      ])}
      {tabs([
        "names",
        table.pagination(contestType.names, {
          thead: [undefined, "language", "color"],
          renderFirstItem: ({ context }) => context.name,
          renderItems: ({ context }) => [
            <Pokedex.LanguageLink code={context.language.name} />,
            context.color,
          ],
        }),
      ])}
    </>
  );
});
