import { Audio, Checkbox, sections, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import Link from "next/link";

const { generateMetadata, generateStaticParams, withData } =
  await Pokedex.createPage({
    getList: "getPokemonsList",
    getData: "getPokemonByName",
    metadataTitleSuffix: "Pokémon",
  });

export { generateMetadata, generateStaticParams };

export default withData(
  /** @param {{ data: Pokemon }} */
  async ({ data: pokemon }) => {
    const pokemonBaseStats = pokemon.stats.map(
      (statElement) => statElement.base_stat
    );

    /** @type PokemonEncounter[] */
    const pokemonLocationAreaEncounters = await Pokedex.getResource(
      pokemon.location_area_encounters
    );

    return (
      <>
        {
          // pokemon.is_default
          table(
            [undefined, "Value"],
            [
              ["Id", pokemon.id],
              [
                "Species",
                <Link href={`/pokemon-species/${pokemon.species.name}`}>
                  {Pokedex.formatName(pokemon.species.name)}
                </Link>,
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
            ]
          )
        }
        {sections(
          [
            "Sprites",
            "A set of sprites used to depict this Pokémon in the game. A visual representation of the various sprites can be found at PokeAPI/sprites",
            table.fromObject(
              [undefined, "Value"],
              pokemon.sprites,
              Pokedex.formatName,
              (src) => <Pokedex.Image src={src} />
            ),
          ],
          [
            "Stats",
            "A list of base stat values for this Pokémon.",
            table(
              [undefined, "Base stat", "Effort"],
              pokemon.stats.map((statElement) => [
                Pokedex.formatName(statElement.stat.name),
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
            "Abilities",
            "A list of abilities this Pokémon could potentially have.",
            table(
              [undefined, "Slot", "Hidden"],
              pokemon.abilities.map((pokemonAbility) => [
                Pokedex.formatName(pokemonAbility.ability.name),
                pokemonAbility.slot,
                <Checkbox checked={pokemonAbility.is_hidden} />,
              ])
            ),
          ],
          [
            "Cries",
            "A set of cries used to depict this Pokémon in the game. A visual representation of the various cries can be found at PokeAPI/cries",
            table(
              [undefined, "Audio"],
              Object.entries(pokemon.cries).map(([input, src]) => [
                Pokedex.formatName(input),
                <Audio src={src} />,
              ])
            ),
          ],
          [
            "Types",
            "A list of details showing types this Pokémon has.",
            table(
              ["Slot", undefined],
              pokemon.types.map((pokemonType) => [
                pokemonType.slot,
                Pokedex.formatName(pokemonType.type.name),
              ])
            ),
          ],
          [
            "Location Area Encounters",
            "Encounter details pertaining to specific versions.",
            table(
              [undefined, "Version Details"],
              pokemonLocationAreaEncounters.map((pokemonEncounter) => [
                Pokedex.formatName(pokemonEncounter.location_area.name),
                table(
                  [undefined, "Max Chance", "Encounter Details"],
                  pokemonEncounter.version_details.map(
                    (versionEncounterDetail) => [
                      Pokedex.formatName(versionEncounterDetail.version.name),
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
                            Pokedex.formatName(encounter.method.name),
                            encounter.chance,
                            encounter.min_level,
                            encounter.max_level,
                            table(
                              ["Name"],
                              encounter.condition_values.map(({ name }) => [
                                Pokedex.formatName(name),
                              ])
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
            "Held Items",
            "A list of items this Pokémon may be holding when encountered.",
            table(
              [undefined, "Version Details"],
              pokemon.held_items.map((heldItem) => [
                Pokedex.formatName(heldItem.item.name),
                table(
                  [undefined, "Rarity"],
                  heldItem.version_details.map((rarityVersion) => [
                    Pokedex.formatName(rarityVersion.version.name),
                    rarityVersion.rarity,
                  ])
                ),
              ])
            ),
          ],
          [
            "Game Indices",
            "A list of game indices relevent to Pokémon item by generation.",
            table(
              [undefined, "Version"],
              pokemon.game_indices.map((versionGameIndex) => [
                versionGameIndex.game_index,
                Pokedex.formatName(versionGameIndex.version.name),
              ])
            ),
          ],
          [
            "Forms",
            "A list of forms this Pokémon can take on.",
            table(
              ["Name"],
              pokemon.forms.map((pokemonFrom) => [
                Pokedex.formatName(pokemonFrom.name),
              ])
            ),
          ],
          [
            "Moves",
            "A list of moves along with learn methods and level details pertaining to specific version groups.",
            table(
              [undefined, "Version Group Details"],
              pokemon.moves.map((moveElement) => [
                Pokedex.formatName(moveElement.move.name),
                table(
                  [
                    "Order",
                    "Level Learned At",
                    "Move Learn Method",
                    "Version Group",
                  ],
                  moveElement.version_group_details.map(
                    (versionGroupDetail) => [
                      versionGroupDetail.order, // ??
                      versionGroupDetail.level_learned_at,
                      Pokedex.formatName(
                        versionGroupDetail.move_learn_method.name
                      ),
                      Pokedex.formatName(versionGroupDetail.version_group.name),
                    ]
                  )
                ),
              ])
            ),
          ]
        )}
      </>
    );
  }
);
