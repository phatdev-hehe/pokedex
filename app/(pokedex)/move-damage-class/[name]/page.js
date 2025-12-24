import { table, tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("move-damage-class");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type MoveDamageClass */
  const moveDamageClass = context.data;

  return tabs({
    moves: table.pagination(moveDamageClass.moves, {
      renderRows: ({ context }) => [
        <Link href={`/move/${context.name}`}>{titleCase(context.name)}</Link>,
      ],
    }),
    ...Page.tabs.descriptions(moveDamageClass.descriptions),
    ...Page.tabs.names(moveDamageClass.names),
  });
});
