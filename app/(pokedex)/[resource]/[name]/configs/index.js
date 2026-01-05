import {
  asyncNoop,
  isFunction,
  mapValues,
  maxBy,
  minBy,
  noop,
  sumBy,
} from "es-toolkit";

import { list, noContent, table } from "@/components";
import { Chart } from "@/components/chart";
import { Link } from "@/components/link";
import { tabs } from "@/components/tabs";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

import {
  Checkbox,
  descriptionList,
  highlighter,
  unit,
  unnamedLink,
} from "./components";
import inlineMath from "./components/inline-math";
import languageLink from "./components/language-link";
import contentTabs from "./content-tabs";

const minLimit = 100;

const EvolutionChainTree = async ({ chain, url }) => {
  const evolutionChainTree = (...chains) =>
    list(
      ...chains.map((chain) => (
        <div
          style={{
            alignItems: "baseline",
            display: "flex",
            gap: "calc(var(--spacing) * 4)",
          }}
        >
          <Link href={`/pokemon-species/${chain.species.name}`}>
            {titleCase(chain.species.name)}
          </Link>
          {Boolean(chain.evolves_to.length) && (
            <span
              style={{
                color: "var(--color-fd-muted-foreground)",
              }}
            >
              {">"}
            </span>
          )}
          {evolutionChainTree(...chain.evolves_to)}
        </div>
      ))
    );

  return evolutionChainTree(
    chain ?? (await Pokedex.api.getResource(url)).chain
  );
};

export default mapValues(
  {
    ...Pokedex.api.routes.reduce((a, b) => {
      a[b] = {};

      return a;
    }, {}),
    ability: ({ context }) => {
      /** @type Ability */
      const ability = context.data;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The generation this ability originated in.",
                "generation"
              ),
              <Link href={`/generation/${ability.generation.name}`}>
                {titleCase(ability.generation.name)}
              </Link>,
            ],
            [
              highlighter(
                "Whether or not this ability originated in the main series of the video games.",
                "main series"
              ),
              <Checkbox checked={ability.is_main_series} />,
            ],
          ])}
          {tabs({
            pokemon: table.pagination(ability.pokemon, {
              renderRows: ({ context }) => [
                <Link href={`/pokemon/${context.pokemon.name}`}>
                  {titleCase(context.pokemon.name)}
                </Link>,
                <Checkbox checked={context.is_hidden} />,
                context.slot,
              ],
              thead: [undefined, "hidden", "slot"],
            }),
            ...contentTabs.effectChanges(ability.effect_changes),
            ...contentTabs.effectEntries(ability.effect_entries),
            ...contentTabs.flavorTextEntries(ability.flavor_text_entries),
            ...contentTabs.names(ability.names),
          })}
        </>
      );
    },
    berry: ({ context }) => {
      /** @type Berry */
      const berry = context.data;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "Berries are actually items. This is a reference to the item specific data for this berry.",
                "the item"
              ),
              <Link href={`/item/${berry.item.name}`}>
                {titleCase(berry.item.name)}
              </Link>,
            ],
            [
              highlighter(
                "The firmness of this berry, used in making Pokéblocks or Poffins.",
                "firmness"
              ),
              <Link href={`/berry-firmness/${berry.firmness.name}`}>
                {titleCase(berry.firmness.name)}
              </Link>,
            ],
            [
              "Time it takes the tree to grow one stage, in hours. Berry trees go through four of these growth stages before they can be picked.",
              berry.growth_time,
            ],
            [
              "The maximum number of these berries that can grow on one tree in Generation IV.",
              berry.max_harvest,
            ],
            [
              highlighter(
                'The power of the move "Natural Gift" when used with this Berry.',
                "power"
              ),
              berry.natural_gift_power,
            ],
            [
              highlighter(
                `The type inherited by "Natural Gift" when used with this Berry.`,
                "type"
              ),
              <Link href={`/type/${berry.natural_gift_type.name}`}>
                {titleCase(berry.natural_gift_type.name)}
              </Link>,
            ],
            [
              highlighter("The size of this Berry, in millimeters.", "size"),
              berry.size,
            ],
            [
              highlighter(
                "The smoothness of this Berry, used in making Pokéblocks or Poffins.",
                "smoothness"
              ),
              berry.smoothness,
            ],
            [
              highlighter(
                "The speed at which this Berry dries out the soil as it grows. A higher rate means the soil dries more quickly.",
                "soil dries"
              ),
              berry.soil_dryness,
            ],
          ])}
          {tabs({
            flavors: table.pagination(berry.flavors, {
              renderRows: ({ context }) => [
                <Link href={`/berry-flavor/${context.flavor.name}`}>
                  {titleCase(context.flavor.name)}
                </Link>,
                context.potency,
              ],
              thead: [undefined, "potency"],
            }),
          })}
        </>
      );
    },
    "berry-firmness": ({ context }) => {
      /** @type BerryFirmness */
      const berryFirmness = context.data;

      return tabs({
        berries: table.pagination(berryFirmness.berries, {
          renderRows: ({ context }) => [
            <Link href={`/berry/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.names(berryFirmness.names),
      });
    },
    "berry-flavor": ({ context }) => {
      /** @type BerryFlavor */
      const berryFlavor = context.data;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The contest type that correlates with this berry flavor.",
                "contest type"
              ),
              <Link href={`/contest-type/${berryFlavor.contest_type.name}`}>
                {titleCase(berryFlavor.contest_type.name)}
              </Link>,
            ],
          ])}
          {tabs({
            berries: table.pagination(berryFlavor.berries, {
              renderRows: ({ context }) => [
                <Link href={`/berry/${context.berry.name}`}>
                  {titleCase(context.berry.name)}
                </Link>,
                context.potency,
              ],
              thead: [undefined, "potency"],
            }),
            ...contentTabs.names(berryFlavor.names),
          })}
        </>
      );
    },
    characteristic: ({ context }) => {
      /** @type Characteristic */
      const characteristic = context.data;

      return (
        <>
          {table(undefined, [
            [
              "The remainder of the highest stat/IV divided by 5.",
              characteristic.gene_modulo,
            ],
            [
              highlighter(
                "The stat which results in this characteristic.",
                "stat"
              ),
              <Link href={`/stat/${characteristic.highest_stat.name}`}>
                {titleCase(characteristic.highest_stat.name)}
              </Link>,
            ],
          ])}
          {tabs({
            possible_values: (
              <>
                {descriptionList(
                  undefined,
                  "The possible values of the highest stat that would result in a Pokémon recieving this characteristic when divided by 5."
                )}
                {list(...characteristic.possible_values)}
              </>
            ),
            ...contentTabs.descriptions(characteristic.descriptions),
          })}
        </>
      );
    },
    "contest-effect": ({ context }) => {
      /** @type ContestEffect */
      const contestEffect = context.data;

      return (
        <>
          {table(undefined, [
            [
              "The base number of hearts the user of this move gets.",
              contestEffect.appeal,
            ],
            [
              `The base number of hearts the user's opponent loses.`,
              contestEffect.jam,
            ],
          ])}
          {tabs({
            ...contentTabs.effectEntries(contestEffect.effect_entries),
            ...contentTabs.flavorTextEntries(contestEffect.flavor_text_entries),
          })}
        </>
      );
    },
    "contest-type": ({ context }) => {
      /** @type ContestType */
      const contestType = context.data;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The berry flavor that correlates with this contest type.",
                "berry flavor"
              ),
              <Link href={`/berry-flavor/${contestType.berry_flavor.name}`}>
                {titleCase(contestType.berry_flavor.name)}
              </Link>,
            ],
          ])}
          {tabs({
            names: table.pagination(contestType.names, {
              renderRows: ({ context }) => [
                context.name,
                context.color,
                languageLink(context.language),
              ],
              thead: [undefined, "color", "language"],
            }),
          })}
        </>
      );
    },
    "egg-group": ({ context }) => {
      /** @type EggGroup */
      const eggGroup = context.data;

      return tabs({
        pokemon_species: table.pagination(eggGroup.pokemon_species, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon-species/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.names(eggGroup.names),
      });
    },
    "encounter-condition": ({ context }) => {
      /** @type EncounterCondition */
      const encounterCondition = context.data;

      return tabs({
        values: (
          <>
            {descriptionList(
              undefined,
              "A list of possible values for this encounter condition."
            )}
            {table.pagination(encounterCondition.values, {
              renderRows: ({ context }) => [
                <Link href={`/encounter-condition-value/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            })}
          </>
        ),
        ...contentTabs.names(encounterCondition.names),
      });
    },
    "encounter-condition-value": ({ context }) => {
      /** @type EncounterConditionValue */
      const encounterConditionValue = context.data;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The condition this encounter condition value pertains to.",
                "encounter condition"
              ),
              <Link
                href={`/encounter-condition/${encounterConditionValue.condition.name}`}
              >
                {titleCase(encounterConditionValue.condition.name)}
              </Link>,
            ],
          ])}
          {tabs(contentTabs.names(encounterConditionValue.names))}
        </>
      );
    },
    "encounter-method": ({ context }) => {
      /** @type EncounterMethod */
      const encounterMethod = context.data;

      return tabs(contentTabs.names(encounterMethod.names));
    },
    "evolution-chain": {
      getContent: ({ context }) => {
        /** @type EvolutionChain */
        const evolutionChain = context.data;

        const babyTriggerItem = evolutionChain.baby_trigger_item?.name;
        const [evolutionDetail] = evolutionChain.chain.evolution_details;

        const chainTabs = (...chains) =>
          tabs(
            Object.fromEntries(
              chains.map((chain) => [
                chain.species.name,
                <>
                  {table(undefined, [
                    ["is_baby", <Checkbox checked={chain.is_baby} />],
                    [
                      "evolution_details",
                      chain.evolution_details.map((evolutionDetail) => {
                        const item = evolutionDetail.item?.name;
                        const heldItem = evolutionDetail.held_item?.name;
                        const knownMove = evolutionDetail.known_move?.name;
                        const knownMoveType =
                          evolutionDetail.known_move_type?.name;
                        const location = evolutionDetail.location?.name;
                        const partySpecies =
                          evolutionDetail.party_species?.name;
                        const partyType = evolutionDetail.party_type?.name;
                        const tradeSpecies =
                          evolutionDetail.trade_species?.name;
                        const trigger = evolutionDetail.trigger?.name;

                        return list(
                          ...[
                            ["base_form_id", evolutionDetail.base_form_id],
                            ["gender", evolutionDetail.gender],
                            [
                              "held_item",
                              <Link href={`/item/${heldItem}`}>
                                {titleCase(heldItem)}
                              </Link>,
                            ],
                            [
                              "item",
                              <Link href={`/item/${item}`}>
                                {titleCase(item)}
                              </Link>,
                            ],
                            [
                              "known_move",
                              <Link href={`/move/${knownMove}`}>
                                {titleCase(knownMove)}
                              </Link>,
                            ],
                            [
                              "known_move_type",
                              <Link href={`/type/${knownMoveType}`}>
                                {titleCase(knownMoveType)}
                              </Link>,
                            ],
                            [
                              "location",
                              <Link href={`/location/${location}`}>
                                {location}
                              </Link>,
                            ],
                            ["min_affection", evolutionDetail.min_affection],
                            ["min_beauty", evolutionDetail.min_beauty],
                            ["min_happiness", evolutionDetail.min_happiness],
                            ["min_level", evolutionDetail.min_level],
                            [
                              "needs_overworld_rain",
                              <Checkbox
                                checked={evolutionDetail.needs_overworld_rain}
                              />,
                            ],
                            [
                              "party_species",
                              <Link href={`/pokemon-species/${partySpecies}`}>
                                {titleCase(partySpecies)}
                              </Link>,
                            ],
                            [
                              "party_type",
                              <Link href={`/type/${partyType}`}>
                                {titleCase(partyType)}
                              </Link>,
                            ],
                            ["region_id", evolutionDetail.region_id],
                            [
                              "relative_physical_stats",
                              evolutionDetail.relative_physical_stats,
                            ],
                            ["time_of_day", evolutionDetail.time_of_day],
                            [
                              "trade_species",
                              <Link href={`/pokemon-species/${tradeSpecies}`}>
                                {titleCase(tradeSpecies)}
                              </Link>,
                            ],
                            [
                              "trigger",
                              <Link href={`/evolution-trigger/${trigger}`}>
                                {titleCase(trigger)}
                              </Link>,
                            ],
                            [
                              "turn_upside_down",
                              <Checkbox
                                checked={evolutionDetail.turn_upside_down}
                              />,
                            ],
                          ].map(([a, b]) => (
                            <>
                              {a}: {b}
                            </>
                          ))
                        );
                      }),
                    ],
                  ])}
                  {chainTabs(...chain.evolves_to)}
                </>,
              ])
            )
          );

        return (
          <>
            {table(undefined, [
              [
                "baby_trigger_item",
                <Link href={`/item/${babyTriggerItem}`}>
                  {titleCase(babyTriggerItem)}
                </Link>,
              ],
              ["tree", <EvolutionChainTree chain={evolutionChain.chain} />],
            ])}
            {chainTabs(evolutionChain.chain)}
          </>
        );
      },
      limit: minLimit,
    },
    "evolution-trigger": ({ context }) => {
      /** @type EvolutionTrigger */
      const evolutionTrigger = context.data;

      return tabs({
        pokemon_species: table.pagination(evolutionTrigger.pokemon_species, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon-species/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.names(evolutionTrigger.names),
      });
    },
    gender: ({ context }) => {
      /** @type Gender */
      const gender = context.data;

      return tabs({
        pokemon_species_details: table.pagination(
          gender.pokemon_species_details,
          {
            renderRows: ({ context }) => [
              <Link href={`/pokemon-species/${context.pokemon_species.name}`}>
                {titleCase(context.pokemon_species.name)}
              </Link>,
              context.rate,
            ],
            thead: [undefined, "rate"],
          }
        ),
        required_for_evolution: (
          <>
            {descriptionList(
              undefined,
              highlighter(
                "A list of Pokémon species that required this gender in order for a Pokémon to evolve into them.",
                "Pokémon species"
              )
            )}
            {table.pagination(gender.required_for_evolution, {
              renderRows: ({ context }) => [
                <Link href={`/pokemon-species/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            })}
          </>
        ),
      });
    },
    generation: ({ context }) => {
      /** @type Generation */
      const generation = context.data;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The main region travelled in this generation.",
                "main region"
              ),
              <Link href={`/region/${generation.main_region.name}`}>
                {titleCase(generation.main_region.name)}
              </Link>,
            ],
          ])}
          {tabs({
            abilities: table.pagination(generation.abilities, {
              renderRows: ({ context }) => [
                <Link href={`/ability/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            moves: table.pagination(generation.moves, {
              renderRows: ({ context }) => [
                <Link href={`/move/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            pokemon_species: table.pagination(generation.pokemon_species, {
              renderRows: ({ context }) => [
                <Link href={`/pokemon-species/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            types: table.pagination(generation.types, {
              renderRows: ({ context }) => [
                <Link href={`/type/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            version_groups: table.pagination(generation.version_groups, {
              renderRows: ({ context }) => [
                <Link href={`/version-group/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            ...contentTabs.names(generation.names),
          })}
        </>
      );
    },
    "growth-rate": ({ context }) => {
      /** @type GrowthRate */
      const growthRate = context.data;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The formula used to calculate the rate at which the Pokémon species gains level.",
                "formula"
              ),
              inlineMath(String.raw`${growthRate.formula}`),
            ],
          ])}
          {tabs({
            levels: table.pagination(growthRate.levels, {
              renderRows: ({ context }) => [context.level, context.experience],
              showIndex: false,
              thead: [undefined, "experience"],
            }),
            pokemon_species: table.pagination(growthRate.pokemon_species, {
              renderRows: ({ context }) => [
                <Link href={`/pokemon-species/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            ...contentTabs.descriptions(growthRate.descriptions),
          })}
        </>
      );
    },
    item: {
      getAvatarSrc: ({ context }) => {
        /** @type Item */
        const item = context.data;

        return item.sprites.default;
      },
      getContent: ({ context }) => {
        /** @type Item */
        const item = context.data;

        const flingEffect = item.fling_effect?.name;

        return (
          <>
            {table(undefined, [
              [
                highlighter(
                  "The category of items this item falls into.",
                  "category"
                ),
                <Link href={`/item-category/${item.category.name}`}>
                  {titleCase(item.category.name)}
                </Link>,
              ],
              [
                highlighter("The price of this item in stores.", "price"),
                item.cost,
              ],
              [
                highlighter(
                  "An evolution chain this item requires to produce a bay during mating.",
                  "evolution chain"
                ),
                unnamedLink(item.baby_trigger_for?.url),
              ],
              [
                "The effect of the move Fling when used with this item.",
                <Link href={`/item-fling-effect/${flingEffect}`}>
                  {titleCase(flingEffect)}
                </Link>,
              ],
              [
                "The power of the move Fling when used with this item.",
                item.fling_power,
              ],
            ])}
            {tabs({
              attributes: table.pagination(item.attributes, {
                renderRows: ({ context }) => [
                  <Link href={`/item-attribute/${context.name}`}>
                    {titleCase(context.name)}
                  </Link>,
                ],
              }),
              held_by_pokemon: table.pagination(item.held_by_pokemon, {
                renderRows: ({ context }) => [
                  <Link href={`/pokemon/${context.pokemon.name}`}>
                    {titleCase(context.pokemon.name)}
                  </Link>,
                  table.pagination(context.version_details, {
                    renderRows: ({ context }) => [
                      <Link href={`/version/${context.version.name}`}>
                        {titleCase(context.version.name)}
                      </Link>,
                      context.rarity,
                    ],
                    thead: [undefined, "rarity"],
                  }),
                ],
                thead: [undefined, "version_details"],
              }),
              ...contentTabs.effectEntries(item.effect_entries),
              ...contentTabs.flavorTextEntries(item.flavor_text_entries),
              ...contentTabs.gameIndices(item.game_indices),
              ...contentTabs.machines(item.machines),
              ...contentTabs.names(item.names),
            })}
          </>
        );
      },
      get getFavicon() {
        return this.getAvatarSrc;
      },
      limit: minLimit,
    },
    "item-attribute": ({ context }) => {
      /** @type ItemAttribute */
      const itemAttribute = context.data;

      return tabs({
        items: table.pagination(itemAttribute.items, {
          renderRows: ({ context }) => [
            <Link href={`/item/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.descriptions(itemAttribute.descriptions),
        ...contentTabs.names(itemAttribute.names),
      });
    },
    "item-category": ({ context }) => {
      /** @type ItemCategory */
      const itemCategory = context.data;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The pocket items in this category would be put in.",
                "pocket"
              ),
              <Link href={`/item-pocket/${itemCategory.pocket.name}`}>
                {titleCase(itemCategory.pocket.name)}
              </Link>,
            ],
          ])}
          {tabs({
            items: table.pagination(itemCategory.items, {
              renderRows: ({ context }) => [
                <Link href={`/item/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            ...contentTabs.names(itemCategory.names),
          })}
        </>
      );
    },
    "item-fling-effect": ({ context }) => {
      /** @type ItemFlingEffect */
      const itemFlingEffect = context.data;

      return tabs({
        items: table.pagination(itemFlingEffect.items, {
          renderRows: ({ context }) => [
            <Link href={`/item/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.effectEntries(itemFlingEffect.effect_entries),
      });
    },
    "item-pocket": ({ context }) => {
      /** @type ItemPocket */
      const itemPocket = context.data;

      return tabs({
        categories: table.pagination(itemPocket.categories, {
          renderRows: ({ context }) => [
            <Link href={`/item-category/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.names(itemPocket.names),
      });
    },
    language: ({ context }) => {
      /** @type Language */
      const language = context.data;

      return (
        <>
          {table(undefined, [
            [
              "Whether or not the games are published in this language.",
              <Checkbox checked={language.official} />,
            ],
            [
              highlighter(
                "iso3166. The two-letter code of the language. Note that it is not unique.",
                "iso3166"
              ),
              language.iso3166,
            ],
            [
              highlighter(
                "iso639. The two-letter code of the country where this language is spoken. Note that it is not unique.",
                "iso639"
              ),
              language.iso639,
            ],
          ])}
          {tabs(contentTabs.names(language.names))}
        </>
      );
    },
    location: {
      getContent: ({ context }) => {
        /** @type PokedexLocation */
        const location = context.data;

        const region = location.region?.name;

        return (
          <>
            {table(undefined, [
              [
                highlighter(
                  "The region this location can be found in.",
                  "region"
                ),
                <Link href={`/region/${region}`}>{titleCase(region)}</Link>,
              ],
            ])}
            {tabs({
              areas: table.pagination(location.areas, {
                renderRows: ({ context }) => [
                  <Link href={`/location-area/${context.name}`}>
                    {titleCase(context.name)}
                  </Link>,
                ],
              }),
              ...contentTabs.gameIndices(location.game_indices),
              ...contentTabs.names(location.names),
            })}
          </>
        );
      },
      limit: minLimit,
    },
    "location-area": {
      getContent: ({ context }) => {
        /** @type LocationArea */
        const locationArea = context.data;

        return (
          <>
            {table(undefined, [
              [
                highlighter(
                  "The region this location area can be found in.",
                  "location"
                ),
                <Link href={`/location/${locationArea.location.name}`}>
                  {titleCase(locationArea.location.name)}
                </Link>,
              ],
            ])}
            {tabs({
              encounter_method_rates: table.pagination(
                locationArea.encounter_method_rates,
                {
                  renderRows: ({ context }) => [
                    <Link
                      href={`/encounter-method/${context.encounter_method.name}`}
                    >
                      {titleCase(context.encounter_method.name)}
                    </Link>,
                    table.pagination(context.version_details, {
                      renderRows: ({ context }) => [
                        <Link href={`/version/${context.version.name}`}>
                          {titleCase(context.version.name)}
                        </Link>,
                        context.rate,
                      ],
                      thead: [undefined, "rate"],
                    }),
                  ],
                  thead: [undefined, "version_details"],
                }
              ),
              pokemon_encounters: table.pagination(
                locationArea.pokemon_encounters,
                {
                  renderRows: ({ context }) => [
                    <Link href={`/pokemon/${context.pokemon.name}`}>
                      {titleCase(context.pokemon.name)}
                    </Link>,
                    contentTabs.encounter.versionDetails(
                      context.version_details,
                      contentTabs.RAW_CONTENT
                    ),
                  ],
                  thead: [undefined, "version_details"],
                }
              ),
              ...contentTabs.names(locationArea.names),
            })}
          </>
        );
      },
      limit: minLimit,
    },
    machine: {
      getContent: ({ context }) => {
        /** @type Machine */
        const machine = context.data;

        return table(undefined, [
          [
            highlighter(
              "The TM or HM item that corresponds to this machine.",
              "item"
            ),
            <Link href={`/item/${machine.item.name}`}>
              {titleCase(machine.item.name)}
            </Link>,
          ],
          [
            highlighter("The move that is taught by this machine.", "move"),
            <Link href={`/move/${machine.move.name}`}>
              {titleCase(machine.move.name)}
            </Link>,
          ],
          [
            highlighter(
              "The version group that this machine applies to.",
              "version group"
            ),
            <Link href={`/version-group/${machine.version_group.name}`}>
              {titleCase(machine.version_group.name)}
            </Link>,
          ],
        ]);
      },
      limit: minLimit,
    },
    move: {
      getContent: ({ context }) => {
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
                unnamedLink(move.contest_effect?.url),
              ],
              [
                highlighter(
                  "The effect the move has when used in a super contest.",
                  "super contest"
                ),
                unnamedLink(move.super_contest_effect?.url),
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
              ...contentTabs.effectChanges(move.effect_changes),
              ...contentTabs.effectEntries(move.effect_entries),
              ...contentTabs.flavorTextEntries(move.flavor_text_entries),
              ...contentTabs.machines(move.machines),
              ...contentTabs.names(move.names),
            })}
          </>
        );
      },
      limit: minLimit,
    },
    "move-ailment": ({ context }) => {
      /** @type MoveAilment */
      const moveAilment = context.data;

      return tabs({
        moves: table.pagination(moveAilment.moves, {
          renderRows: ({ context }) => [
            <Link href={`/move/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.names(moveAilment.names),
      });
    },
    "move-battle-style": ({ context }) => {
      /** @type MoveBattleStyle */
      const moveBattleStyle = context.data;

      return tabs(contentTabs.names(moveBattleStyle.names));
    },
    "move-category": ({ context }) => {
      /** @type MoveCategory */
      const moveCategory = context.data;

      return tabs({
        moves: table.pagination(moveCategory.moves, {
          renderRows: ({ context }) => [
            <Link href={`/move/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.descriptions(moveCategory.descriptions),
      });
    },
    "move-damage-class": ({ context }) => {
      /** @type MoveDamageClass */
      const moveDamageClass = context.data;

      return tabs({
        moves: table.pagination(moveDamageClass.moves, {
          renderRows: ({ context }) => [
            <Link href={`/move/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.descriptions(moveDamageClass.descriptions),
        ...contentTabs.names(moveDamageClass.names),
      });
    },
    "move-learn-method": ({ context }) => {
      /** @type MoveLearnMethod */
      const moveLearnMethod = context.data;

      return tabs({
        version_groups: table.pagination(moveLearnMethod.version_groups, {
          renderRows: ({ context }) => [
            <Link href={`/version-group/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.descriptions(moveLearnMethod.descriptions),
        ...contentTabs.names(moveLearnMethod.names),
      });
    },
    "move-target": ({ context }) => {
      /** @type MoveTarget */
      const moveTarget = context.data;

      return tabs({
        moves: table.pagination(moveTarget.moves, {
          renderRows: ({ context }) => [
            <Link href={`/move/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.descriptions(moveTarget.descriptions),
        ...contentTabs.names(moveTarget.names),
      });
    },
    nature: ({ context }) => {
      /** @type Nature */
      const nature = context.data;

      const decreasedStat = nature.decreased_stat?.name;
      const hatesFlavor = nature.hates_flavor?.name;
      const increasedStat = nature.increased_stat?.name;
      const likesFlavor = nature.likes_flavor?.name;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The stat decreased by 10% in Pokémon with this nature.",
                "stat decreased"
              ),
              <Link href={`/stat/${decreasedStat}`}>
                {titleCase(decreasedStat)}
              </Link>,
            ],
            [
              highlighter(
                "The flavor hated by Pokémon with this nature.",
                "flavor hated"
              ),
              <Link href={`/berry-flavor/${hatesFlavor}`}>
                {titleCase(hatesFlavor)}
              </Link>,
            ],
            [
              highlighter(
                "The stat increased by 10% in Pokémon with this nature.",
                "stat increased"
              ),
              <Link href={`/stat/${increasedStat}`}>
                {titleCase(increasedStat)}
              </Link>,
            ],
            [
              highlighter(
                "The flavor liked by Pokémon with this nature.",
                "flavor liked"
              ),
              <Link href={`/berry-flavor/${likesFlavor}`}>
                {titleCase(likesFlavor)}
              </Link>,
            ],
          ])}
          {tabs({
            move_battle_style_preferences: table.pagination(
              nature.move_battle_style_preferences,
              {
                renderRows: ({ context }) => [
                  <Link
                    href={`/move-battle-style/${context.move_battle_style.name}`}
                  >
                    {titleCase(context.move_battle_style.name)}
                  </Link>,
                  context.high_hp_preference,
                  context.low_hp_preference,
                ],
                thead: [undefined, "high_hp_preference", "low_hp_preference"],
              }
            ),
            pokeathlon_stat_changes: table.pagination(
              nature.pokeathlon_stat_changes,
              {
                renderRows: ({ context }) => [
                  <Link
                    href={`/pokeathlon-stat/${context.pokeathlon_stat.name}`}
                  >
                    {titleCase(context.pokeathlon_stat.name)}
                  </Link>,
                  context.max_change,
                ],
                thead: [undefined, "max_change"],
              }
            ),
            ...contentTabs.names(nature.names),
          })}
        </>
      );
    },
    "pal-park-area": ({ context }) => {
      /** @type PalParkArea */
      const palParkArea = context.data;

      return tabs({
        pokemon_encounters: table.pagination(palParkArea.pokemon_encounters, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon-species/${context.pokemon_species.name}`}>
              {titleCase(context.pokemon_species.name)}
            </Link>,
            context.base_score,
            context.rate,
          ],
          thead: ["pokemon_species", "base_score", "rate"],
        }),
        ...contentTabs.names(palParkArea.names),
      });
    },
    "pokeathlon-stat": ({ context }) => {
      /** @type PokeathlonStat */
      const pokeathlonStat = context.data;

      return tabs({
        affecting_natures: tabs(
          mapValues(pokeathlonStat.affecting_natures, (value) =>
            table.pagination(value, {
              renderRows: ({ context }) => [
                <Link href={`/nature/${context.nature.name}`}>
                  {titleCase(context.nature.name)}
                </Link>,
                context.max_change,
              ],
              thead: [undefined, "max_change"],
            })
          )
        ),
        ...contentTabs.names(pokeathlonStat.names),
      });
    },
    pokedex: ({ context }) => {
      /** @type Pokedex */
      const pokedex = context.data;

      const region = pokedex.region?.name;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "Whether or not this Pokédex originated in the main series of the video games.",
                "main series"
              ),
              <Checkbox checked={pokedex.is_main_series} />,
            ],
            [
              highlighter(
                "The region this Pokédex catalogues Pokémon for.",
                "region"
              ),
              <Link href={`/region/${region}`}>{titleCase(region)}</Link>,
            ],
          ])}
          {tabs({
            pokemon_entries: table.pagination(pokedex.pokemon_entries, {
              renderRows: ({ context }) => [
                <Link href={`/pokemon-species/${context.pokemon_species.name}`}>
                  {titleCase(context.pokemon_species.name)}
                </Link>,
                context.entry_number,
              ],
              thead: ["pokemon_species", "entry_number"],
            }),
            version_groups: table.pagination(pokedex.version_groups, {
              renderRows: ({ context }) => [
                <Link href={`/version-group/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            ...contentTabs.descriptions(pokedex.descriptions),
            ...contentTabs.names(pokedex.names),
          })}
        </>
      );
    },
    pokemon: {
      getAvatarSrc: ({ context }) => {
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
      getContent: async ({ context }) => {
        /** @type Pokemon */
        const pokemon = context.data;

        return (
          <>
            {table(undefined, [
              ["Height", unit(pokemon.height, "dm")],
              ["Weight", unit(pokemon.weight, "hg")],
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
            ])}
            {tabs({
              abilities: table.pagination(pokemon.abilities, {
                renderRows: ({ context }) => [
                  <Link href={`/ability/${context.ability.name}`}>
                    {titleCase(context.ability.name)}
                  </Link>,
                  <Checkbox checked={context.is_hidden} />,
                  context.slot,
                ],
                thead: [undefined, "hidden", "slot"],
              }),
              cries: table.pagination(Object.entries(pokemon.cries), {
                renderRows: ({ context }) => [
                  titleCase(context[0]),
                  <audio controls src={context[1]} />,
                ],
              }),
              forms: table.pagination(pokemon.forms, {
                renderRows: ({ context }) => [
                  <Link href={`/pokemon-form/${context.name}`}>
                    {titleCase(context.name)}
                  </Link>,
                ],
              }),
              held_items: table.pagination(pokemon.held_items, {
                renderRows: ({ context }) => [
                  <Link href={`/item/${context.item.name}`}>
                    {titleCase(context.item.name)}
                  </Link>,
                  table.pagination(context.version_details, {
                    renderRows: ({ context }) => [
                      <Link href={`/version/${context.version.name}`}>
                        {titleCase(context.version.name)}
                      </Link>,
                      context.rarity,
                    ],
                    thead: [undefined, "rarity"],
                  }),
                ],
                thead: [undefined, "version_details"],
              }),
              location_area_encounters: table.pagination(
                await Pokedex.api.getResource(pokemon.location_area_encounters),
                {
                  renderRows: ({ context }) => [
                    <Link href={`/location-area/${context.location_area.name}`}>
                      {titleCase(context.location_area.name)}
                    </Link>,
                    contentTabs.encounter.versionDetails(
                      context.version_details,
                      contentTabs.RAW_CONTENT
                    ),
                  ],
                  thead: [undefined, "version_details"],
                }
              ),
              moves: table.pagination(pokemon.moves, {
                renderRows: ({ context }) => [
                  <Link href={`/move/${context.move.name}`}>
                    {titleCase(context.move.name)}
                  </Link>,
                  table.pagination(context.version_group_details, {
                    renderRows: ({ context }) => [
                      context.order,
                      context.level_learned_at,
                      <Link
                        href={`/move-learn-method/${context.move_learn_method.name}`}
                      >
                        {titleCase(context.move_learn_method.name)}
                      </Link>,
                      <Link
                        href={`/version-group/${context.version_group.name}`}
                      >
                        {titleCase(context.version_group.name)}
                      </Link>,
                    ],
                    showIndex: false,
                    thead: [
                      "order",
                      "level_learned_at",
                      "move_learn_method",
                      "version_group",
                    ],
                  }),
                ],
                thead: [undefined, "version_group_details"],
              }),
              stats: tabs({
                content: table(
                  [undefined, "base_stat", "effort"],
                  pokemon.stats.map((statElement) => [
                    <Link href={`/stat/${statElement.stat.name}`}>
                      {titleCase(statElement.stat.name)}
                    </Link>,
                    statElement.base_stat,
                    statElement.effort,
                  ]),
                  <tr>
                    <td>Min/Max/Total</td>
                    <td>
                      {[
                        minBy(
                          pokemon.stats,
                          (statElement) => statElement.base_stat
                        ).base_stat,
                        maxBy(
                          pokemon.stats,
                          (statElement) => statElement.base_stat
                        ).base_stat,
                        sumBy(
                          pokemon.stats,
                          (statElement) => statElement.base_stat
                        ),
                      ].join("/")}
                    </td>
                    <td />
                  </tr>
                ),
                // eslint-disable-next-line perfectionist/sort-objects
                chart: (
                  <Chart
                    series={[
                      {
                        data: pokemon.stats.map((statElement) => ({
                          name: statElement.stat.name,
                          y: statElement.base_stat,
                        })),
                        options: { name: "Base Stat" },
                        type: "pie",
                      },
                    ]}
                  />
                ),
              }),
              ...contentTabs.gameIndices(pokemon.game_indices),
              ...contentTabs.sprites(pokemon.sprites),
              ...contentTabs.types(pokemon.types),
            })}
          </>
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
    },
    "pokemon-color": ({ context }) => {
      /** @type PokemonColor */
      const pokemonColor = context.data;

      return tabs({
        pokemon_species: table.pagination(pokemonColor.pokemon_species, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon-species/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.names(pokemonColor.names),
      });
    },
    "pokemon-form": {
      getAvatarSrc: ({ context }) => {
        /** @type PokemonForm */
        const pokemonForm = context.data;

        return pokemonForm.sprites.front_default;
      },
      getContent: ({ context }) => {
        /** @type PokemonForm */
        const pokemonForm = context.data;

        return (
          <>
            {table(undefined, [
              [
                highlighter(
                  "The Pokémon that can take on this form.",
                  "Pokémon"
                ),
                <Link href={`/pokemon/${pokemonForm.pokemon.name}`}>
                  {titleCase(pokemonForm.pokemon.name)}
                </Link>,
              ],
              [
                highlighter(
                  "The version group this Pokémon form was introduced in.",
                  "version group"
                ),
                <Link href={`/version-group/${pokemonForm.version_group.name}`}>
                  {titleCase(pokemonForm.version_group.name)}
                </Link>,
              ],
              [
                highlighter("The name of this form.", "name"),
                titleCase(pokemonForm.form_name),
              ],
              [
                highlighter(
                  `The order in which forms should be sorted within a species' forms.`,
                  "order"
                ),
                pokemonForm.form_order,
              ],
              [
                highlighter(
                  "True for exactly one form used as the default for each Pokémon.",
                  "default"
                ),
                <Checkbox checked={pokemonForm.is_default} />,
              ],
              [
                "Whether or not this form can only happen during battle.",
                <Checkbox checked={pokemonForm.is_battle_only} />,
              ],
              [
                highlighter(
                  "Whether or not this form requires mega evolution.",
                  "mega"
                ),
                <Checkbox checked={pokemonForm.is_mega} />,
              ],
            ])}
            {tabs({
              ...contentTabs.names(pokemonForm.form_names, "form_names"),
              ...contentTabs.names(pokemonForm.names),
              ...contentTabs.sprites(pokemonForm.sprites),
              ...contentTabs.types(pokemonForm.types),
            })}
          </>
        );
      },
      get getFavicon() {
        return this.getAvatarSrc;
      },
      limit: minLimit,
    },
    "pokemon-habitat": ({ context }) => {
      /** @type PokemonHabitat */
      const pokemonHabitat = context.data;

      return tabs({
        pokemon_species: table.pagination(pokemonHabitat.pokemon_species, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon-species/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.names(pokemonHabitat.names),
      });
    },
    "pokemon-shape": ({ context }) => {
      /** @type PokemonShape */
      const pokemonShape = context.data;

      return tabs({
        awesome_names: table.pagination(pokemonShape.awesome_names, {
          renderRows: ({ context }) => [
            context.awesome_name,
            languageLink(context.language),
          ],
          thead: [undefined, "language"],
        }),
        pokemon_species: table.pagination(pokemonShape.pokemon_species, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon-species/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...contentTabs.names(pokemonShape.names),
      });
    },
    "pokemon-species": ({ context }) => {
      /** @type PokemonSpecies */
      const pokemonSpecies = context.data;

      const previousPokemonSpeciesName =
        pokemonSpecies.evolves_from_species?.name;
      const habitat = pokemonSpecies.habitat?.name;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The Pokémon species that evolves into this Pokemon_species.",
                "Pokémon species"
              ),
              <Link href={`/pokemon-species/${previousPokemonSpeciesName}`}>
                {titleCase(previousPokemonSpeciesName)}
              </Link>,
            ],
            [
              highlighter(
                "The generation this Pokémon species was introduced in.",
                "generation"
              ),
              <Link href={`/generation/${pokemonSpecies.generation.name}`}>
                {titleCase(pokemonSpecies.generation.name)}
              </Link>,
            ],
            [
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {highlighter(
                  "The evolution chain this Pokémon species is a member of.",
                  "evolution chain"
                )}
                {unnamedLink(pokemonSpecies.evolution_chain.url)}
              </div>,
              <EvolutionChainTree url={pokemonSpecies.evolution_chain.url} />,
            ],
            [
              highlighter("Whether or not this is a baby Pokémon.", "baby"),
              <Checkbox checked={pokemonSpecies.is_baby} />,
            ],
            [
              highlighter(
                "Whether or not this is a legendary Pokémon.",
                "legendary"
              ),
              <Checkbox checked={pokemonSpecies.is_legendary} />,
            ],
            [
              highlighter(
                "Whether or not this is a mythical Pokémon.",
                "mythical"
              ),
              <Checkbox checked={pokemonSpecies.is_mythical} />,
            ],
            [
              highlighter(
                "The happiness when caught by a normal Pokéball; up to 255. The higher the number, the happier the Pokémon.",
                "happiness"
              ),
              pokemonSpecies.base_happiness,
            ],
            [
              highlighter(
                "The base capture rate; up to 255. The higher the number, the easier the catch.",
                "capture rate"
              ),
              pokemonSpecies.capture_rate,
            ],
            [
              highlighter(
                "The color of this Pokémon for Pokédex search.",
                "color"
              ),
              <Link href={`/pokemon-color/${pokemonSpecies.color.name}`}>
                {titleCase(pokemonSpecies.color.name)}
              </Link>,
            ],
            [
              "The rate at which this Pokémon species gains levels.",
              <Link href={`/growth-rate/${pokemonSpecies.growth_rate.name}`}>
                {titleCase(pokemonSpecies.growth_rate.name)}
              </Link>,
            ],
            [
              highlighter(
                "Whether or not this Pokémon has multiple forms and can switch between them.",
                "multiple forms"
              ),
              <Checkbox checked={pokemonSpecies.forms_switchable} />,
            ],
            [
              "The chance of this Pokémon being female, in eighths; or -1 for genderless.",
              pokemonSpecies.gender_rate,
            ],
            [
              highlighter(
                "The habitat this Pokémon species can be encountered in.",
                "habitat"
              ),
              <Link href={`/pokemon-habitat/${habitat}`}>
                {titleCase(habitat)}
              </Link>,
            ],
            [
              highlighter(
                "Whether or not this Pokémon has visual gender differences.",
                "gender differences"
              ),
              <Checkbox checked={pokemonSpecies.has_gender_differences} />,
            ],
            [
              highlighter(
                `Initial hatch counter: one must walk Y × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's. Y varies per generation. In Generations II, III, and VII, Egg cycles are 256 steps long. In Generation IV, Egg cycles are 255 steps long. In Pokémon Brilliant Diamond and Shining Pearl, Egg cycles are also 255 steps long, but are shorter on special dates. In Generations V and VI, Egg cycles are 257 steps long. In Pokémon Sword and Shield, and in Pokémon Scarlet and Violet, Egg cycles are 128 steps long.`,
                "Initial hatch counter"
              ),
              pokemonSpecies.hatch_counter,
            ],
            [
              highlighter(
                "The shape of this Pokémon for Pokédex search.",
                "shape"
              ),
              <Link href={`/pokemon-shape/${pokemonSpecies.shape.name}`}>
                {titleCase(pokemonSpecies.shape.name)}
              </Link>,
            ],
          ])}
          {tabs({
            egg_groups: table.pagination(pokemonSpecies.egg_groups, {
              renderRows: ({ context }) => [
                <Link href={`/egg-group/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            genera: table.pagination(pokemonSpecies.genera, {
              renderRows: ({ context }) => [
                context.genus,
                languageLink(context.language),
              ],
              thead: ["genus", "language"],
            }),
            pal_park_encounters: table.pagination(
              pokemonSpecies.pal_park_encounters,
              {
                renderRows: ({ context }) => [
                  <Link href={`/pal-park-area/${context.area.name}`}>
                    {titleCase(context.area.name)}
                  </Link>,
                  context.base_score,
                  context.rate,
                ],
                thead: ["area", "base_score", "rate"],
              }
            ),
            pokedex_numbers: table.pagination(pokemonSpecies.pokedex_numbers, {
              renderRows: ({ context }) => [
                <Link href={`/pokedex/${context.pokedex.name}`}>
                  {titleCase(context.pokedex.name)}
                </Link>,
                context.entry_number,
              ],
              thead: [undefined, "entry_number"],
            }),
            varieties: table.pagination(pokemonSpecies.varieties, {
              renderRows: ({ context }) => [
                <Link href={`/pokemon/${context.pokemon.name}`}>
                  {titleCase(context.pokemon.name)}
                </Link>,
                <Checkbox checked={context.is_default} />,
              ],
              thead: [undefined, "default"],
            }),
            ...contentTabs.descriptions(
              pokemonSpecies.form_descriptions,
              "form_descriptions"
            ),
            ...contentTabs.flavorTextEntries(
              pokemonSpecies.flavor_text_entries
            ),
            ...contentTabs.names(pokemonSpecies.names),
          })}
        </>
      );
    },
    region: ({ context }) => {
      /** @type Region */
      const region = context.data;

      const mainGeneration = region.main_generation?.name;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The generation this region was introduced in.",
                "generation"
              ),
              <Link href={`/generation/${mainGeneration}`}>
                {titleCase(mainGeneration)}
              </Link>,
            ],
          ])}
          {tabs({
            locations: table.pagination(region.locations, {
              renderRows: ({ context }) => [
                <Link href={`/location/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            pokedexes: table.pagination(region.pokedexes, {
              renderRows: ({ context }) => [
                <Link href={`/pokedex/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            version_groups: table.pagination(region.version_groups, {
              renderRows: ({ context }) => [
                <Link href={`/version-group/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            ...contentTabs.names(region.names),
          })}
        </>
      );
    },
    stat: ({ context }) => {
      /** @type Stat */
      const stat = context.data;

      const moveDamageClass = stat.move_damage_class?.name;

      return (
        <>
          {table(undefined, [
            [
              "Whether this stat only exists within a battle.",
              <Checkbox checked={stat.is_battle_only} />,
            ],
            [
              "The class of damage this stat is directly related to.",
              <Link href={`/move-damage-class/${moveDamageClass}`}>
                {titleCase(moveDamageClass)}
              </Link>,
            ],
          ])}
          {tabs({
            affecting_items: table.pagination(stat.affecting_items, {
              renderRows: ({ context }) => [
                <Link href={`/item/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            affecting_moves: tabs(
              mapValues(stat.affecting_moves, (value) =>
                table.pagination(value, {
                  renderRows: ({ context }) => [
                    <Link href={`/move/${context.move.name}`}>
                      {titleCase(context.move.name)}
                    </Link>,
                    context.change,
                  ],
                  thead: [undefined, "change"],
                })
              )
            ),
            affecting_natures: tabs(
              mapValues(stat.affecting_natures, (value) =>
                table.pagination(value, {
                  renderRows: ({ context }) => [
                    <Link href={`/nature/${context.name}`}>
                      {titleCase(context.name)}
                    </Link>,
                  ],
                })
              )
            ),
            characteristics: table.pagination(stat.characteristics, {
              renderRows: ({ context }) => [unnamedLink(context.url)],
            }),
            ...contentTabs.names(stat.names),
          })}
        </>
      );
    },
    "super-contest-effect": ({ context }) => {
      /** @type SuperContestEffect */
      const superContestEffect = context.data;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The level of appeal this super contest effect has.",
                "appeal"
              ),
              superContestEffect.appeal,
            ],
          ])}
          {tabs({
            moves: table.pagination(superContestEffect.moves, {
              renderRows: ({ context }) => [
                <Link href={`/move/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            ...contentTabs.flavorTextEntries(
              superContestEffect.flavor_text_entries
            ),
          })}
        </>
      );
    },
    type: {
      getAvatarSrc: ({ context }) => {
        /** @type Type */
        const type = context.data;

        return type.sprites["generation-ix"]["scarlet-violet"].name_icon;
      },
      getContent: ({ context }) => {
        /** @type Type */
        const type = context.data;

        const moveDamageClass = type.move_damage_class?.name;

        return (
          <>
            {table(undefined, [
              [
                highlighter(
                  "The generation this type was introduced in.",
                  "generation"
                ),
                <Link href={`/generation/${type.generation.name}`}>
                  {titleCase(type.generation.name)}
                </Link>,
              ],
              [
                "The class of damage inflicted by this type.",
                <Link href={`/move-damage-class/${moveDamageClass}`}>
                  {titleCase(moveDamageClass)}
                </Link>,
              ],
            ])}
            {tabs({
              damage_relations: tabs(
                mapValues(type.damage_relations, (value) =>
                  table.pagination(value, {
                    renderRows: ({ context }) => [
                      <Link href={`/type/${context.name}`}>
                        {titleCase(context.name)}
                      </Link>,
                    ],
                  })
                )
              ),
              moves: table.pagination(type.moves, {
                renderRows: ({ context }) => [
                  <Link href={`/move/${context.name}`}>
                    {titleCase(context.name)}
                  </Link>,
                ],
              }),
              pokemon: table.pagination(type.pokemon, {
                renderRows: ({ context }) => [
                  <Link href={`/pokemon/${context.pokemon.name}`}>
                    {titleCase(context.pokemon.name)}
                  </Link>,
                  context.slot,
                ],
                thead: [undefined, "slot"],
              }),
              ...contentTabs.gameIndices(type.game_indices),
              ...contentTabs.names(type.names),
              ...contentTabs.sprites(type.sprites),
            })}
          </>
        );
      },
    },
    version: ({ context }) => {
      /** @type Version */
      const version = context.data;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The version group this version belongs to.",
                "version group"
              ),
              <Link href={`/version-group/${version.version_group.name}`}>
                {titleCase(version.version_group.name)}
              </Link>,
            ],
          ])}
          {tabs(contentTabs.names(version.names))}
        </>
      );
    },
    "version-group": ({ context }) => {
      /** @type VersionGroup */
      const versionGroup = context.data;

      return (
        <>
          {table(undefined, [
            [
              highlighter(
                "The generation this version was introduced in.",
                "generation"
              ),
              <Link href={`/generation/${versionGroup.generation.name}`}>
                {titleCase(versionGroup.generation.name)}
              </Link>,
            ],
          ])}
          {tabs({
            move_learn_methods: table.pagination(
              versionGroup.move_learn_methods,
              {
                renderRows: ({ context }) => [
                  <Link href={`/move-learn-method/${context.name}`}>
                    {titleCase(context.name)}
                  </Link>,
                ],
              }
            ),
            pokedexes: table.pagination(versionGroup.pokedexes, {
              renderRows: ({ context }) => [
                <Link href={`/pokedex/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            regions: table.pagination(versionGroup.regions, {
              renderRows: ({ context }) => [
                <Link href={`/region/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
            versions: table.pagination(versionGroup.versions, {
              renderRows: ({ context }) => [
                <Link href={`/version/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
          })}
        </>
      );
    },
  },
  (value) => {
    if (isFunction(value)) value = { getContent: value };

    value = {
      getAvatarSrc: noop,
      getContent: asyncNoop,
      getFavicon: noop,
      limit: Infinity,
      ...value,
    };

    return {
      ...value,
      getContent: async (...args) =>
        (await value.getContent(...args)) ?? noContent(),
    };
  }
);
