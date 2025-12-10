import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("move", {
  staticLimit: process.env.DEFAULT_STATIC_LIMIT,
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Move */
  const move = context.data;

  const contestType = move.contest_type?.name;
  const ailment = move.meta?.ailment.name;
  const category = move.meta?.category.name;

  move.machines;
  move.super_contest_effect;

  return (
    <>
      {table(undefined, [
        [
          "The percent value of how likely this move is to be successful.",
          move.accuracy,
        ],
        [
          highlighter(
            "The type of appeal this move gives a Pokémon when used in a contest.",
            "contest"
          ),
          <Link href={`/contest-type/${contestType}`}>
            {titleCase(contestType)}
          </Link>,
        ],
        [
          "The type of damage the move inflicts on the target.",
          <Link href={`/move-damage-class/${move.damage_class.name}`}>
            {titleCase(move.damage_class.name)}
          </Link>,
        ],
        [
          highlighter(
            "The percent value of how likely it is this moves effect will happen.",
            "effect"
          ),
          move.effect_chance,
        ],
        [
          "The generation in which this move was introduced.",
          <Link href={`/generation/${move.generation.name}`}>
            {titleCase(move.generation.name)}
          </Link>,
        ],
        [
          "The base power of this move with a value of 0 if it does not have a base power.",
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
      {tabs(
        [
          "meta",
          table(undefined, [
            ["Ailment Chance", move.meta?.ailment_chance],
            [
              "Ailment",
              <Link href={`/move-ailment/${ailment}`}>
                {titleCase(ailment)}
              </Link>,
            ],
            [
              "Category",
              <Link href={`/move-category/${category}`}>
                {titleCase(category)}
              </Link>,
            ],
            ["Crit Rate", move.meta?.crit_rate],
            ["Drain", move.meta?.drain],
            ["Flinch Chance", move.meta?.flinch_chance],
            ["Healing", move.meta?.healing],
            ["Max Hits", move.meta?.max_hits],
            ["Max Turns", move.meta?.max_turns],
            ["Min Hits", move.meta?.min_hits],
            ["Min Turns", move.meta?.min_turns],
            ["Stat Chance", move.meta?.stat_chance],
          ]),
        ],
        Page.tabs.names(move.names),
        [
          "stat_changes",
          table.pagination(move.stat_changes, {
            thead: [undefined, "change"],
            renderRows: ({ context }) => [
              <Link href={`/stat/${context.stat.name}`}>
                {titleCase(context.stat.name)}
              </Link>,
              context.change,
            ],
          }),
        ],
        [
          "contest_combos",
          table.pagination(Object.entries(move?.contest_combos ?? {}), {
            thead: ["set", "detail"],
            renderRows: ({ context }) => [
              titleCase(context[0]),
              table.pagination(Object.entries(context[1]), {
                thead: [undefined, "move"],
                renderRows: ({ context }) => [
                  titleCase(context[0]),
                  table.pagination(context[1], {
                    renderRows: ({ context }) => [
                      <Link href={`/move/${context.name}`}>
                        {titleCase(context.name)}
                      </Link>,
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
        Page.tabs.effectChanges(move.effect_changes),
        Page.tabs.effectEntries(move.effect_entries),
        Page.tabs.flavorTextEntries(move.flavor_text_entries),
        [
          "learned_by_pokemon",
          table.pagination(move.learned_by_pokemon, {
            renderRows: ({ context }) => [
              <Link href={`/pokemon/${context.name}`}>
                {titleCase(context.name)}
              </Link>,
            ],
          }),
        ]
      )}
    </>
  );
});
