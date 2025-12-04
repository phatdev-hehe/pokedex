import { Checkbox, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("stat");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Stat */
  const stat = context.data;

  return (
    <>
      {table(undefined, [
        ["ID the games use for this stat.", stat.game_index],
        [
          "Whether this stat only exists within a battle.",
          <Checkbox checked={stat.is_battle_only} />,
        ],
        [
          "The class of damage this stat is directly related to.",
          titleCase(stat.move_damage_class?.name), // ??
        ],
      ])}
      {tabs(
        Page.tabs.names(stat.names),
        Page.tabs.items(stat.affecting_items, "affecting_items"),
        [
          "affecting_moves",
          table.pagination(Object.entries(stat.affecting_moves), {
            thead: ["set", undefined],
            renderRows: ({ context }) => [
              titleCase(context[0]),
              table.pagination(Object.values(context[1]), {
                thead: [undefined, "change"],
                renderRows: ({ context }) => [
                  <Link href={`/move/${context.move.name}`}>
                    {titleCase(context.move.name)}
                  </Link>,
                  context.change,
                ],
              }),
            ],
          }),
        ],
        [
          "affecting_natures",
          table.pagination(Object.entries(stat.affecting_natures), {
            thead: ["set", undefined],
            renderRows: ({ context }) => [
              titleCase(context[0]),
              table.pagination(Object.values(context[1]), {
                renderRows: ({ context }) => [
                  <Link href={`/nature/${context.name}`}>
                    {titleCase(context.name)}
                  </Link>,
                ],
              }),
            ],
          }),
        ]
      )}
    </>
  );
});
