import { audio, Checkbox, highlighter, Link, table, tabs } from "@/components";
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
              <th>Min/Max/Total</th>
              <td>
                {[
                  Math.min(...pokemonBaseStats),
                  Math.max(...pokemonBaseStats),
                  pokemonBaseStats.reduce((a, b) => a + b, 0),
                ].join("/")}
              </td>
              <td />
            </tr>
          ),
        ],
        [
          "abilities",
          table.pagination(pokemon.abilities, {
            thead: [undefined, "slot", "hidden"],
            renderRows: ({ context }) => [
              <Link href={`/ability/${context.ability.name}`}>
                {titleCase(context.ability.name)}
              </Link>,
              context.slot,
              <Checkbox checked={context.is_hidden} />,
            ],
          }),
        ],
        [
          "cries",
          table.pagination(Object.entries(pokemon.cries), {
            renderRows: ({ context }) => [
              titleCase(context[0]),
              audio(context[1]),
            ],
          }),
        ],
        Page.tabs.types(pokemon.types),
        [
          "location_area_encounters",
          table.pagination(
            await Pokedex.api.getResource(pokemon.location_area_encounters),
            {
              thead: [undefined, "version_details"],
              renderRows: ({ context }) => [
                titleCase(context.location_area.name),
                Page.tabs.versionDetails(context.version_details)[1],
              ],
            }
          ),
        ],
        [
          "held_items",
          table.pagination(pokemon.held_items, {
            thead: [undefined, "version_details"],
            renderRows: ({ context }) => [
              <Link href={`/item/${context.item.name}`}>
                {titleCase(context.item.name)}
              </Link>,
              table.pagination(context.version_details, {
                thead: [undefined, "rarity"],
                renderRows: ({ context }) => [
                  <Link href={`/version/${context.version.name}`}>
                    {titleCase(context.version.name)}
                  </Link>,
                  context.rarity,
                ],
              }),
            ],
          }),
        ],
        Page.tabs.gameIndices(pokemon.game_indices),
        [
          "forms",
          table.pagination(pokemon.forms, {
            renderRows: ({ context }) => [
              <Link href={`/pokemon-form/${context.name}`}>
                {titleCase(context.name)}
              </Link>,
            ],
          }),
        ],
        [
          "moves",
          table.pagination(pokemon.moves, {
            thead: [undefined, "version_group_details"],
            renderRows: ({ context }) => [
              <Link href={`/move/${context.move.name}`}>
                {titleCase(context.move.name)}
              </Link>,
              table.pagination(context.version_group_details, {
                thead: [
                  "order",
                  "level_learned_at",
                  "move_learn_method",
                  "version_group",
                ],
                renderRows: ({ context }) => [
                  context.order,
                  context.level_learned_at,
                  titleCase(context.move_learn_method.name),
                  <Link href={`/version-group/${context.version_group.name}`}>
                    {titleCase(context.version_group.name)}
                  </Link>,
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
