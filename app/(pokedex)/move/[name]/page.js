import { mapValues } from "es-toolkit";

import { highlighter, table, tabs } from "@/components";
import { Link, UnnamedLink } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("move", {
  staticLimit: process.env.MIN_STATIC_LIMIT,
});

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Move */
  const move = context.data;

  const contestType = move.contest_type?.name;
  const ailment = move.meta?.ailment.name;
  const category = move.meta?.category.name;

  return (
    <>
      {table(undefined, [
        [
          "The percent value of how likely this move is to be successful.",
          move.accuracy,
        ],
        [
          "The type of appeal this move gives a Pokémon when used in a contest.",
          <Link href={`/contest-type/${contestType}`}>
            {titleCase(contestType)}
          </Link>,
        ],
        [
          "The effect the move has when used in a contest.",
          <UnnamedLink href={move.contest_effect?.url} />,
        ],
        [
          highlighter(
            "The effect the move has when used in a super contest.",
            "super contest"
          ),
          <UnnamedLink href={move.super_contest_effect?.url} />,
        ],
        [
          "The type of damage the move inflicts on the target.",
          <Link href={`/move-damage-class/${move.damage_class.name}`}>
            {titleCase(move.damage_class.name)}
          </Link>,
        ],
        [
          "The percent value of how likely it is this moves effect will happen.",
          move.effect_chance,
        ],
        [
          highlighter(
            "The generation in which this move was introduced.",
            "generation"
          ),
          <Link href={`/generation/${move.generation.name}`}>
            {titleCase(move.generation.name)}
          </Link>,
        ],
        [
          highlighter(
            "The base power of this move with a value of 0 if it does not have a base power.",
            "The base power"
          ),
          move.power,
        ],
        [
          highlighter(
            "Power points. The number of times this move can be used.",
            "Power points"
          ),
          move.pp,
        ],
        [
          "A value between -8 and 8. Sets the order in which moves are executed during battle.",
          move.priority,
        ],
        [
          highlighter(
            "The type of target that will receive the effects of the attack.",
            "target"
          ),
          <Link href={`/move-target/${move.target.name}`}>
            {titleCase(move.target.name)}
          </Link>,
        ],
        [
          highlighter("The elemental type of this move.", "type"),
          <Link href={`/type/${move.type.name}`}>
            {titleCase(move.type.name)}
          </Link>,
        ],
      ])}
      {tabs({
        contest_combos: tabs(
          mapValues(move?.contest_combos ?? {}, (value) =>
            tabs(
              mapValues(value, (value) =>
                table.pagination(value, {
                  renderRows: ({ context }) => [
                    <Link href={`/move/${context.name}`}>
                      {titleCase(context.name)}
                    </Link>,
                  ],
                })
              )
            )
          )
        ),
        learned_by_pokemon: table.pagination(move.learned_by_pokemon, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        meta: table(
          undefined,
          Object.entries({
            ailment: (
              <Link href={`/move-ailment/${ailment}`}>
                {titleCase(ailment)}
              </Link>
            ),
            ailment_chance: move.meta?.ailment_chance,
            category: (
              <Link href={`/move-category/${category}`}>
                {titleCase(category)}
              </Link>
            ),
            crit_rate: move.meta?.crit_rate,
            drain: move.meta?.drain,
            flinch_chance: move.meta?.flinch_chance,
            healing: move.meta?.healing,
            max_hits: move.meta?.max_hits,
            max_turns: move.meta?.max_turns,
            min_hits: move.meta?.min_hits,
            min_turns: move.meta?.min_turns,
            stat_chance: move.meta?.stat_chance,
          }).map(([key, value]) => [titleCase(key), value])
        ),
        stat_changes: table.pagination(move.stat_changes, {
          renderRows: ({ context }) => [
            <Link href={`/stat/${context.stat.name}`}>
              {titleCase(context.stat.name)}
            </Link>,
            context.change,
          ],
          thead: [undefined, "change"],
        }),
        ...Page.tabs.effectChanges(move.effect_changes),
        ...Page.tabs.effectEntries(move.effect_entries),
        ...Page.tabs.flavorTextEntries(move.flavor_text_entries),
        ...Page.tabs.machines(move.machines),
        ...Page.tabs.names(move.names),
      })}
    </>
  );
});
