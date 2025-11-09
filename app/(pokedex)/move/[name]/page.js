import { table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";
import Link from "next/link";

const page = await Pokedex.createPage({
  getList: "getMovesList",
  getData: "getMoveByName",
  titleSuffix: "Move",
});

export const generateMetadata = page.generateMetadata;
export const generateStaticParams = page.generateStaticParams;

export default page.withData(({ data }) => {
  /** @type Move */
  const move = data;

  return (
    <>
      {table(undefined, [
        [
          "The percent value of how likely this move is to be successful.",
          move.accuracy,
        ],
        [
          "The type of appeal this move gives a Pokémon when used in a contest.",
          titleCase(move.contest_type?.name), // ??
        ],
        [
          "The type of damage the move inflicts on the target.",
          titleCase(move.damage_class.name),
        ],
        [
          "The percent value of how likely it is this moves effect will happen.",
          move.effect_chance,
        ],
      ])}
      {page.sections(
        [
          "contest_combos",
          "A detail of normal and super contest combos that require this move.",
          table(
            ["Set", "Detail"],
            Object.entries(
              move?.contest_combos ?? [] // ??
            ).map(([key, value]) => [
              titleCase(key),
              table(
                undefined,
                Object.entries(value).map(([key, moves]) => [
                  titleCase(key),
                  moves &&
                    table(
                      ["Move"],
                      moves.map((move) => [
                        <Link href={`/move/${move.name}`}>
                          {titleCase(move.name)}
                        </Link>,
                      ])
                    ),
                ])
              ),
            ])
          ),
        ],
        [
          "effect_changes",
          "The list of previous effects this move has had across version groups of the games.",
          table(
            ["Version Group", "Effect Entries"],
            move.effect_changes.map((effectChange) => [
              titleCase(effectChange.version_group.name),
              table(
                [undefined, "Language"],
                effectChange.effect_entries.map((effect) => [
                  effect.effect,
                  effect.language.name,
                ])
              ),
            ])
          ),
        ]
      )}
    </>
  );
});
