import { mapValues } from "es-toolkit";

import { Checkbox, table, tabs } from "@/components";
import { Link, UnnamedLink } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("stat");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Stat */
  const stat = context.data;

  const moveDamageClass = stat.move_damage_class?.name;

  return (
    <>
      {table(undefined, [
        [
          "Whether this stat only exists within a battle.",
          <Checkbox checked={stat.is_battle_only} />,
        ],
        [
          "The class of damage this stat is directly related to.",
          <Link href={`/move-damage-class/${moveDamageClass}`}>
            {titleCase(moveDamageClass)}
          </Link>,
        ],
      ])}
      {tabs({
        affecting_items: table.pagination(stat.affecting_items, {
          renderRows: ({ context }) => [
            <Link href={`/item/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        affecting_moves: tabs(
          mapValues(stat.affecting_moves, (value) =>
            table.pagination(value, {
              renderRows: ({ context }) => [
                <Link href={`/move/${context.move.name}`}>
                  {titleCase(context.move.name)}
                </Link>,
                context.change,
              ],
              thead: [undefined, "change"],
            })
          )
        ),
        affecting_natures: tabs(
          mapValues(stat.affecting_natures, (value) =>
            table.pagination(value, {
              renderRows: ({ context }) => [
                <Link href={`/nature/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            })
          )
        ),
        characteristics: table.pagination(stat.characteristics, {
          renderRows: ({ context }) => [<UnnamedLink href={context.url} />],
        }),
        ...Page.tabs.names(stat.names),
      })}
    </>
  );
});
