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
        [
          "affecting_items",
          table.pagination(stat.affecting_items, {
            renderFirstItem: ({ context }) => (
              <Link href={`/item/${context.name}`}>
                {titleCase(context.name)}
              </Link>
            ),
          }),
        ],
        [
          "affecting_moves",
          table.pagination(Object.entries(stat.affecting_moves), {
            thead: ["set", undefined],
            renderFirstItem: ({ context }) => titleCase(context[0]),
            renderItems: ({ context }) => [
              table.pagination(Object.values(context[1]), {
                thead: [undefined, "change"],
                renderFirstItem: ({ context }) => (
                  <Link href={`/move/${context.move.name}`}>
                    {titleCase(context.move.name)}
                  </Link>
                ),
                renderItems: ({ context }) => [context.change],
              }),
            ],
          }),
        ],
        [
          "affecting_natures",
          table.pagination(Object.entries(stat.affecting_natures), {
            thead: ["set", undefined],
            renderFirstItem: ({ context }) => titleCase(context[0]),
            renderItems: ({ context }) => [
              table.pagination(Object.values(context[1]), {
                renderFirstItem: ({ context }) => [titleCase(context.name)],
              }),
            ],
          }),
        ]
      )}
    </>
  );
});
