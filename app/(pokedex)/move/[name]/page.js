import { table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";
import Link from "next/link";

const Page = await Pokedex.createDetailPage("move");

export const { generateMetadata, generateStaticParams } = Page;

export default Page.withContext((context) => {
  /** @type Move */
  const move = context.data;

  move.machines;
  move.super_contest_effect;

  return (
    <Page.Root>
      {table(undefined, [
        ["Id", move.id],
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
        [
          "The generation in which this move was introduced.",
          titleCase(move.generation.name),
        ],
        [
          "The base power of this move with a value of 0 if it does not have a base power.",
          move.power,
        ],
        ["Power points. The number of times this move can be used.", move.pp],
        [
          "A value between -8 and 8. Sets the order in which moves are executed during battle.",
          move.priority,
        ],
        [
          "The type of target that will receive the effects of the attack.",
          titleCase(move.target.name),
        ],
        [
          "The elemental type of this move.",
          <Link href={`/type/${move.type.name}`}>
            {titleCase(move.type.name)}
          </Link>,
        ],
      ])}
      {Page.tabs(
        [
          "meta",
          "Metadata about this move",
          table(
            undefined,
            // ??
            [
              ["Ailment Chance", move.meta?.ailment_chance],
              ["Ailment", titleCase(move.meta?.ailment.name)],
              ["Category", titleCase(move.meta?.category.name)],
              ["Crit Rate", move.meta?.crit_rate],
              ["Drain", move.meta?.drain],
              ["Flinch Chance", move.meta?.flinch_chance],
              ["Healing", move.meta?.healing],
              ["Max Hits", move.meta?.max_hits],
              ["Max Turns", move.meta?.max_turns],
              ["Min Hits", move.meta?.min_hits],
              ["Min Turns", move.meta?.min_turns],
              ["Stat Chance", move.meta?.stat_chance],
            ]
          ),
        ],
        Page.tabs.names(move.names),
        [
          "stat_changes",
          "A list of stats this moves effects and how much it effects them.",
          table(
            [undefined, "change"],
            move.stat_changes.map((statChange) => [
              <Link href={`/stat/${statChange.stat.name}`}>
                {titleCase(statChange.stat.name)}
              </Link>,
              statChange.change,
            ])
          ),
        ],
        [
          "contest_combos",
          "A detail of normal and super contest combos that require this move.",
          table(
            ["set", "detail"],
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
                      ["move"],
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
        Page.tabs.effectChanges(
          move.effect_changes,
          "The list of previous effects this move has had across version groups of the games."
        ),
        Page.tabs.effectEntries(
          move.effect_entries,
          "The effect of this move listed in different languages."
        ),
        Page.tabs.flavorTextEntries(
          move.flavor_text_entries,
          "The flavor text of this move listed in different languages."
        ),
        [
          "learned_by_pokemon",
          "List of Pokemon that can learn the move",
          table(
            undefined,
            move.learned_by_pokemon.map((pokemon) => [
              <Link href={`/pokemon/${pokemon.name}`}>
                {titleCase(pokemon.name)}
              </Link>,
            ])
          ),
        ]
      )}
    </Page.Root>
  );
});
