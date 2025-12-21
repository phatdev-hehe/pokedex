import { highlighter, table } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("machine", {
  staticLimit: process.env.MIN_STATIC_LIMIT,
});

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Machine */
  const machine = context.data;

  return table(undefined, [
    [
      highlighter(
        "The TM or HM item that corresponds to this machine.",
        "item"
      ),
      <Link href={`/item/${machine.item.name}`}>
        {titleCase(machine.item.name)}
      </Link>,
    ],
    [
      highlighter("The move that is taught by this machine.", "move"),
      <Link href={`/move/${machine.move.name}`}>
        {titleCase(machine.move.name)}
      </Link>,
    ],
    [
      highlighter(
        "The version group that this machine applies to.",
        "version group"
      ),
      <Link href={`/version-group/${machine.version_group.name}`}>
        {titleCase(machine.version_group.name)}
      </Link>,
    ],
  ]);
});
