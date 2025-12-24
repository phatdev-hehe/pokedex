import { tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("move-category");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type MoveCategory */
  const moveCategory = context.data;

  return tabs({
    moves: table.pagination(moveCategory.moves, {
      renderRows: ({ context }) => [
        <Link href={`/move/${context.name}`}>{titleCase(context.name)}</Link>,
      ],
    }),
    ...Page.tabs.descriptions(moveCategory.descriptions),
  });
});
