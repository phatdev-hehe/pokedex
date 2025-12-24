import { tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("move-ailment");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type MoveAilment */
  const moveAilment = context.data;

  return tabs({
    moves: table.pagination(moveAilment.moves, {
      renderRows: ({ context }) => [
        <Link href={`/move/${context.name}`}>{titleCase(context.name)}</Link>,
      ],
    }),
    ...Page.tabs.names(moveAilment.names),
  });
});
