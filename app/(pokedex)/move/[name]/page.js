import { highlighter, Link, table } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils";

const Page = await Pokedex.createDetailPage("move");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Move */
  const move = context.data;

  move.machines;
  move.super_contest_effect;

  return (
    <>
      {table(undefined, [
        ["Id", move.id],
        [
          "The percent value of how likely this move is to be successful.",
          move.accuracy,
        ],
        [
          highlighter(
            "The type of appeal this move gives a Pokémon when used in a contest.",
            "contest"
          ),
          titleCase(move.contest_type?.name), // ??
        ],
        [
          "The type of damage the move inflicts on the target.",
          titleCase(move.damage_class.name),
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
          titleCase(move.generation.name),
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
          titleCase(move.target.name),
        ],
        [
          highlighter("The elemental type of this move.", "type"),
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
          table.pagination(move.stat_changes, {
            thead: [undefined, "change"],
            renderFirstItem: ({ context }) => (
              <Link href={`/stat/${context.stat.name}`}>
                {titleCase(context.stat.name)}
              </Link>
            ),
            renderItems: ({ context }) => [context.change],
          }),
        ],
        [
          "contest_combos",
          "A detail of normal and super contest combos that require this move.",
          table.pagination(
            Object.entries(
              move?.contest_combos ?? [] // ??
            ),
            {
              thead: ["set", "detail"],
              renderFirstItem: ({ context }) => titleCase(context[0]),
              renderItems: ({ context }) => [
                table.pagination(Object.entries(context[1]), {
                  thead: [undefined, "move"],
                  renderFirstItem: ({ context }) => titleCase(context[0]),
                  renderItems: ({ context }) => [
                    table.pagination(context[1], {
                      renderFirstItem: ({ context }) => (
                        <Link href={`/move/${context.name}`}>
                          {titleCase(context.name)}
                        </Link>
                      ),
                    }),
                  ],
                }),
              ],
            }
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
          table.pagination(move.learned_by_pokemon, {
            renderFirstItem: ({ context }) => (
              <Link href={`/pokemon/${context.name}`}>
                {titleCase(context.name)}
              </Link>
            ),
          }),
        ]
      )}
    </>
  );
});
