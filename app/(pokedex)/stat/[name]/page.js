import { Checkbox, sections, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";

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
      {table(
        [undefined, "Value"],
        [
          ["Id", stat.id],
          ["ID the games use for this stat.", stat.game_index],
          [
            "Whether this stat only exists within a battle.",
            <Checkbox checked={stat.is_battle_only} />,
          ],
          [
            "The class of damage this stat is directly related to.",
            Pokedex.formatName(stat.move_damage_class?.name ?? ""),
          ],
        ]
      )}
      {sections(
        [
          "Names",
          undefined,
          table(
            ["Language", undefined],
            stat.names.map((name) => [name.language.name, name.name])
          ),
        ],
        [
          "Affecting Items",
          undefined,
          table(
            ["Name"],
            stat.affecting_items.map((affectingItem) => [
              Pokedex.formatName(affectingItem.name),
            ])
          ),
        ],
        [
          "Affecting Moves",
          "A detail of moves which affect this stat positively or negatively.",
          table(
            [undefined, "Value"],
            Object.entries(stat.affecting_moves).map(([key, value]) => [
              Pokedex.formatName(key),
              table(
                ["Move", "Change"],
                Object.values(value).map(({ change, move }) => [
                  Pokedex.formatName(move.name),
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
            [undefined, "Value"],
            Object.entries(stat.affecting_natures).map(([key, value]) => [
              Pokedex.formatName(key),
              table(
                ["Name"],
                Object.values(value).map(({ name }) => [
                  Pokedex.formatName(name),
                ])
              ),
            ])
          ),
        ]
      )}
    </>
  );
});
