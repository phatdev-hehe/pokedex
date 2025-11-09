import { Audio, Checkbox, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";
import Link from "next/link";

const page = await Pokedex.createPage({
  getList: "getPokemonsList",
  getData: "getPokemonByName",
  titleSuffix: "Pokémon",
  getAvatar: ({ data }) => {
    /** @type Pokemon */
    const pokemon = data;

    return (
      pokemon.sprites.versions["generation-v"]["black-white"].animated
        .front_default ??
      pokemon.sprites.other.showdown.front_default ??
      pokemon.sprites.front_default
    );
  },
});

export const generateMetadata = page.generateMetadata;
export const generateStaticParams = page.generateStaticParams;

export default page.withData(async ({ data }) => {
  /** @type Pokemon */
  const pokemon = data;

  const pokemonBaseStats = pokemon.stats.map(
    (statElement) => statElement.base_stat
  );

  /** @type PokemonEncounter[] */
  const pokemonLocationAreaEncounters = await Pokedex.api.getResource(
    pokemon.location_area_encounters
  );

  return (
    <>
      {table(undefined, [
        ["Id", pokemon.id],
        [
          "Species",
          <Link href={`/pokemon-species/${pokemon.species.name}`}>
            {titleCase(pokemon.species.name)}
          </Link>,
        ],
        [
          "Set for exactly one Pokémon used as the default for each species.",
          <Checkbox checked={pokemon.is_default} />,
        ],
        [
          "Order for sorting. Almost national order, except families are grouped together.",
          pokemon.order,
        ],
        [
          "The base experience gained for defeating this Pokémon.",
          pokemon.base_experience,
        ],
        ["Height", pokemon.height],
        ["Weight", pokemon.weight],
      ])}
      {page.sections(
        page.sections.sprites(
          pokemon.sprites,
          "A set of sprites used to depict this Pokémon in the game. A visual representation of the various sprites can be found at PokeAPI/sprites"
        ),
        [
          "stats",
          "A list of base stat values for this Pokémon.",
          table(
            [undefined, "Base stat", "Effort"],
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
          "A list of abilities this Pokémon could potentially have.",
          table(
            [undefined, "Slot", "Hidden"],
            pokemon.abilities.map((pokemonAbility) => [
              titleCase(pokemonAbility.ability.name),
              pokemonAbility.slot,
              <Checkbox checked={pokemonAbility.is_hidden} />,
            ])
          ),
        ],
        [
          "cries",
          "A set of cries used to depict this Pokémon in the game. A visual representation of the various cries can be found at PokeAPI/cries",
          table(
            undefined,
            Object.entries(pokemon.cries).map(([input, src]) => [
              titleCase(input),
              <Audio src={src} />,
            ])
          ),
        ],
        [
          "types",
          "A list of details showing types this Pokémon has.",
          table(
            [undefined, "Slot"],
            pokemon.types.map((pokemonType) => [
              <Link href={`/type/${pokemonType.type.name}`}>
                {titleCase(pokemonType.type.name)}
              </Link>,
              pokemonType.slot,
            ])
          ),
        ],
        [
          "location_area_encounters",
          "Encounter details pertaining to specific versions.",
          table(
            [undefined, "Version Details"],
            pokemonLocationAreaEncounters.map((pokemonEncounter) => [
              titleCase(pokemonEncounter.location_area.name),
              table(
                [undefined, "Max Chance", "Encounter Details"],
                pokemonEncounter.version_details.map(
                  (versionEncounterDetail) => [
                    titleCase(versionEncounterDetail.version.name),
                    versionEncounterDetail.max_chance,
                    table(
                      [
                        undefined,
                        "Chance",
                        "Min Level",
                        "Max Level",
                        "Condition Values",
                      ],
                      versionEncounterDetail.encounter_details.map(
                        (encounter) => [
                          titleCase(encounter.method.name),
                          encounter.chance,
                          encounter.min_level,
                          encounter.max_level,
                          table(
                            undefined,
                            encounter.condition_values.map(
                              (encounterConditionValue) => [
                                titleCase(encounterConditionValue.name),
                              ]
                            )
                          ),
                        ]
                      )
                    ),
                  ]
                )
              ),
            ])
          ),
        ],
        [
          "held_items",
          "A list of items this Pokémon may be holding when encountered.",
          table(
            [undefined, "Version Details"],
            pokemon.held_items.map((heldItem) => [
              titleCase(heldItem.item.name),
              table(
                [undefined, "Rarity"],
                heldItem.version_details.map((rarityVersion) => [
                  titleCase(rarityVersion.version.name),
                  rarityVersion.rarity,
                ])
              ),
            ])
          ),
        ],
        [
          "game_indices",
          "A list of game indices relevent to Pokémon item by generation.",
          table(
            [undefined, "Version"],
            pokemon.game_indices.map((versionGameIndex) => [
              versionGameIndex.game_index,
              titleCase(versionGameIndex.version.name),
            ])
          ),
        ],
        [
          "forms",
          "A list of forms this Pokémon can take on.",
          table(
            undefined,
            pokemon.forms.map((pokemonFrom) => [titleCase(pokemonFrom.name)])
          ),
        ],
        [
          "moves",
          "A list of moves along with learn methods and level details pertaining to specific version groups.",
          table(
            [undefined, "Version Group Details"],
            pokemon.moves.map((moveElement) => [
              titleCase(moveElement.move.name),
              table(
                [
                  "Order",
                  "Level Learned At",
                  "Move Learn Method",
                  "Version Group",
                ],
                moveElement.version_group_details.map((versionGroupDetail) => [
                  versionGroupDetail.order, // ??
                  versionGroupDetail.level_learned_at,
                  titleCase(versionGroupDetail.move_learn_method.name),
                  titleCase(versionGroupDetail.version_group.name),
                ])
              ),
            ])
          ),
        ]
      )}
    </>
  );
});
