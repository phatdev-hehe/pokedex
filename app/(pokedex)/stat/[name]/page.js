import { Checkbox, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";
import Link from "next/link";

const Page = await Pokedex.createPage({
  getList: "getStatsList",
  getData: "getStatByName",
  titleSuffix: "stat",
});

export const generateMetadata = Page.generateMetadata;
export const generateStaticParams = Page.generateStaticParams;

export default Page.withData(({ data }) => {
  /** @type Stat */
  const stat = data;

  return (
    <Page.Root>
      {table(undefined, [
        ["Id", stat.id],
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
      {Page.tabs(
        Page.tabs.names(stat.names),
        [
          "affecting_items",
          undefined,
          table(
            undefined,
            stat.affecting_items.map((affectingItem) => [
              titleCase(affectingItem.name),
            ])
          ),
        ],
        [
          "affecting_moves",
          "A detail of moves which affect this stat positively or negatively.",
          table(
            ["set", undefined],
            Object.entries(stat.affecting_moves).map(([key, value]) => [
              titleCase(key),
              table(
                [undefined, "change"],
                Object.values(value).map(({ change, move }) => [
                  <Link href={`/move/${move.name}`}>
                    {titleCase(move.name)}
                  </Link>,
                  change,
                ])
              ),
            ])
          ),
        ],
        [
          "affecting_natures",
          "A detail of natures which affect this stat positively or negatively.",
          table(
            ["set", undefined],
            Object.entries(stat.affecting_natures).map(([key, value]) => [
              titleCase(key),
              table(
                undefined,
                Object.values(value).map(({ name }) => [titleCase(name)])
              ),
            ])
          ),
        ]
      )}
    </Page.Root>
  );
});
