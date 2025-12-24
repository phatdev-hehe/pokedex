import { tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("move-learn-method");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type MoveLearnMethod */
  const moveLearnMethod = context.data;

  return tabs({
    version_groups: table.pagination(moveLearnMethod.version_groups, {
      renderRows: ({ context }) => [
        <Link href={`/version-group/${context.name}`}>
          {titleCase(context.name)}
        </Link>,
      ],
    }),
    ...Page.tabs.descriptions(moveLearnMethod.descriptions),
    ...Page.tabs.names(moveLearnMethod.names),
  });
});
