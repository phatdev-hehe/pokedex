import { Audio, Checkbox, highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("pokemon", {
  getAvatar: ({ context }) => {
    /** @type Pokemon */
    const pokemon = context.data;

    return (
      pokemon.sprites.versions["generation-v"]["black-white"].animated
        .front_default ??
      pokemon.sprites.versions["generation-v"]["black-white"].animated
        .front_female ??
      pokemon.sprites.other.showdown.front_default ??
      pokemon.sprites.other.showdown.front_female ??
      pokemon.sprites.front_default ??
      pokemon.sprites.front_female
    );
  },
  getFavicon: ({ context }) => {
    /** @type Pokemon */
    const pokemon = context.data;

    return (
      pokemon.sprites.versions["generation-vii"].icons.front_default ??
      pokemon.sprites.versions["generation-viii"].icons.front_default
    );
  },
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page(async ({ context }) => {
  /** @type Pokemon */
  const pokemon = context.data;

  const pokemonBaseStats = pokemon.stats.map(
    (statElement) => statElement.base_stat
  );

  return (
    <>
      {table(undefined, [
        ["Id", pokemon.id],
        [
          highlighter("The species this Pokémon belongs to.", "species"),
          <Link href={`/pokemon-species/${pokemon.species.name}`}>
            {titleCase(pokemon.species.name)}
          </Link>,
        ],
        [
          highlighter(
            "Set for exactly one Pokémon used as the default for each species.",
            "default"
          ),
          <Checkbox checked={pokemon.is_default} />,
        ],
        [
          highlighter(
            "Order for sorting. Almost national order, except families are grouped together.",
            "Order"
          ),
          pokemon.order,
        ],
        [
          highlighter(
            "The base experience gained for defeating this Pokémon.",
            "experience"
          ),
          pokemon.base_experience,
        ],
        [
          highlighter("The height of this Pokémon in decimetres.", "height"),
          pokemon.height,
        ],
        [
          highlighter("The weight of this Pokémon in hectograms.", "weight"),
          pokemon.weight,
        ],
      ])}
      {tabs(
        Page.tabs.sprites(pokemon.sprites),
        [
          "stats",
          table(
            [undefined, "base_stat", "effort"],
            pokemon.stats.map((statElement) => [
              <Link href={`/stat/${statElement.stat.name}`}>
                {titleCase(statElement.stat.name)}
              </Link>,
              statElement.base_stat,
              statElement.effort,
            ]),
            <tr>
              <th>Min / Max / Total</th>
              <td>
                {[
                  Math.min(...pokemonBaseStats),
                  Math.max(...pokemonBaseStats),
                  pokemonBaseStats.reduce((a, b) => a + b, 0),
                ].join(" / ")}
              </td>
              <td />
            </tr>
          ),
        ],
        [
          "abilities",
          table.pagination(pokemon.abilities, {
            thead: [undefined, "slot", "hidden"],
            renderFirstItem: ({ context }) => (
              <Link href={`/ability/${context.ability.name}`}>
                {titleCase(context.ability.name)}
              </Link>
            ),
            renderItems: ({ context }) => [
              context.slot,
              <Checkbox checked={context.is_hidden} />,
            ],
          }),
        ],
        [
          "cries",
          table.pagination(Object.entries(pokemon.cries), {
            renderFirstItem: ({ context }) => titleCase(context[0]),
            renderItems: ({ context }) => [<Audio src={context[1]} />],
          }),
        ],
        Page.tabs.types(pokemon.types),
        [
          "location_area_encounters",
          table.pagination(
            await Pokedex.api.getResource(pokemon.location_area_encounters),
            {
              thead: [undefined, "version_details"],
              renderFirstItem: ({ context }) =>
                titleCase(context.location_area.name),
              renderItems: ({ context }) => [
                table.pagination(context.version_details, {
                  thead: [undefined, "max_chance", "encounter_details"],
                  renderFirstItem: ({ context }) =>
                    titleCase(context.version.name),
                  renderItems: ({ context }) => [
                    context.max_chance,
                    table.pagination(context.encounter_details, {
                      thead: [
                        undefined,
                        "chance",
                        "min_level",
                        "max_level",
                        "condition_values",
                      ],
                      renderFirstItem: ({ context }) =>
                        titleCase(context.method.name),
                      renderItems: ({ context }) => [
                        context.chance,
                        context.min_level,
                        context.max_level,
                        table.pagination(context.condition_values, {
                          renderFirstItem: ({ context }) =>
                            titleCase(context.name),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }
          ),
        ],
        [
          "held_items",
          table.pagination(pokemon.held_items, {
            thead: [undefined, "version_details"],
            renderFirstItem: ({ context }) => (
              <Link href={`/item/${context.item.name}`}>
                {titleCase(context.item.name)}
              </Link>
            ),
            renderItems: ({ context }) => [
              table.pagination(context.version_details, {
                thead: [undefined, "rarity"],
                renderFirstItem: ({ context }) =>
                  titleCase(context.version.name),
                renderItems: ({ context }) => [context.rarity],
              }),
            ],
          }),
        ],
        Page.tabs.gameIndices(pokemon.game_indices),
        [
          "forms",
          table.pagination(pokemon.forms, {
            renderFirstItem: ({ context }) => (
              <Link href={`/pokemon-form/${context.name}`}>
                {titleCase(context.name)}
              </Link>
            ),
          }),
        ],
        [
          "moves",
          table.pagination(pokemon.moves, {
            thead: [undefined, "version_group_details"],
            renderFirstItem: ({ context }) => (
              <Link href={`/move/${context.move.name}`}>
                {titleCase(context.move.name)}
              </Link>
            ),
            renderItems: ({ context }) => [
              table.pagination(context.version_group_details, {
                thead: [
                  "order",
                  "level_learned_at",
                  "move_learn_method",
                  "version_group",
                ],
                renderFirstItem: ({ context }) => context.order, // ??
                renderItems: ({ context }) => [
                  context.level_learned_at,
                  titleCase(context.move_learn_method.name),
                  titleCase(context.version_group.name),
                ],
                showIndex: false,
              }),
            ],
          }),
        ]
      )}
    </>
  );
});
