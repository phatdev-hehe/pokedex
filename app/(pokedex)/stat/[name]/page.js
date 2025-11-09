import { Checkbox, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";

const page = await Pokedex.createPage({
  getList: "getStatsList",
  getData: "getStatByName",
  titleSuffix: "Stat",
});

export const generateMetadata = page.generateMetadata;
export const generateStaticParams = page.generateStaticParams;

export default page.withData(({ data }) => {
  /** @type Stat */
  const stat = data;

  return (
    <>
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
      {page.sections(
        page.sections.names(stat.names),
        [
          "Affecting Items",
          undefined,
          table(
            undefined,
            stat.affecting_items.map((affectingItem) => [
              titleCase(affectingItem.name),
            ])
          ),
        ],
        [
          "Affecting Moves",
          "A detail of moves which affect this stat positively or negatively.",
          table(
            ["Set", undefined],
            Object.entries(stat.affecting_moves).map(([key, value]) => [
              titleCase(key),
              table(
                [undefined, "Change"],
                Object.values(value).map(({ change, move }) => [
                  titleCase(move.name),
                  change,
                ])
              ),
            ])
          ),
        ],
        [
          "Affecting Natures",
          "A detail of natures which affect this stat positively or negatively.",
          table(
            ["Set", undefined],
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
    </>
  );
});
