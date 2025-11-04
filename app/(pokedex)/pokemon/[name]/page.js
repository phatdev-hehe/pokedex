import { Audio, Checkbox, DescriptionList, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";

const { generateMetadata, generateStaticParams, withData } =
  await Pokedex.buildPage({
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
        {table(
          [undefined, "Value"],
          [
            ["Id", pokemon.id],
            [
              <DescriptionList term="Species">
                The species this Pokémon belongs to.
              </DescriptionList>,
              Pokedex.formatName(pokemon.species.name),
            ],
            [
              <DescriptionList term="Order">
                Order for sorting. Almost national order, except families are
                grouped together.
              </DescriptionList>,
              pokemon.order,
            ],
            [
              <DescriptionList term="Default">
                Set for exactly one Pokémon used as the default for each
                species.
              </DescriptionList>,
              <Checkbox checked={pokemon.is_default} />,
            ],
            [
              <DescriptionList term="Base Experience">
                The base experience gained for defeating this Pokémon.
              </DescriptionList>,
              pokemon.base_experience,
            ],
            [
              <DescriptionList term="Height">
                The height of this Pokémon in decimetres.
              </DescriptionList>,
              pokemon.height,
            ],
            [
              <DescriptionList term="Weight">
                The weight of this Pokémon in hectograms.
              </DescriptionList>,
              pokemon.weight,
            ],
          ]
        )}
        <DescriptionList term={<h2>Sprites</h2>}>
          A set of sprites used to depict this Pokémon in the game. A visual
          representation of the various sprites can be found at PokeAPI/sprites
        </DescriptionList>
        {table.fromObject(
          [undefined, "Value"],
          pokemon.sprites,
          Pokedex.formatName,
          (src) => (
            <Pokedex.Image src={src} />
          )
        )}
        <DescriptionList term={<h2>Stats</h2>}>
          A list of base stat values for this Pokémon.
        </DescriptionList>
        {table(
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
        )}
        <DescriptionList term={<h2>Abilities</h2>}>
          A list of abilities this Pokémon could potentially have.
        </DescriptionList>
        {table(
          [undefined, "Hidden", "Slot"],
          pokemon.abilities.map((pokemonAbility) => [
            Pokedex.formatName(pokemonAbility.ability.name),
            <Checkbox checked={pokemonAbility.is_hidden} />,
            pokemonAbility.slot,
          ])
        )}
        <DescriptionList term={<h2>Cries</h2>}>
          A set of cries used to depict this Pokémon in the game. A visual
          representation of the various cries can be found at PokeAPI/cries
        </DescriptionList>
        {table(
          [undefined, "Audio"],
          Object.entries(pokemon.cries).map(([input, src]) => [
            Pokedex.formatName(input),
            <Audio src={src} />,
          ])
        )}
        <DescriptionList term={<h2>Types</h2>}>
          A list of details showing types this Pokémon has.
        </DescriptionList>
        {table(
          ["Slot", undefined],
          pokemon.types.map((pokemonType) => [
            pokemonType.slot,
            Pokedex.formatName(pokemonType.type.name),
          ])
        )}
        <DescriptionList term={<h2>Location Area Encounters</h2>}>
          Encounter details pertaining to specific versions.
        </DescriptionList>
        {table(
          [undefined, "Version Details"],
          pokemonLocationAreaEncounters.map((pokemonEncounter) => [
            Pokedex.formatName(pokemonEncounter.location_area.name),
            table(
              [undefined, "Max Chance", "Encounter Details"],
              pokemonEncounter.version_details.map((versionEncounterDetail) => [
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
                  versionEncounterDetail.encounter_details.map((encounter) => [
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
                  ])
                ),
              ])
            ),
          ])
        )}
        <DescriptionList term={<h2>Held Items</h2>}>
          A list of items this Pokémon may be holding when encountered.
        </DescriptionList>
        {table(
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
        )}
        <DescriptionList term={<h2>Game Indices</h2>}>
          A list of game indices relevent to Pokémon item by generation.
        </DescriptionList>
        {table(
          ["Index", "Version"],
          pokemon.game_indices.map(({ game_index, version }) => [
            game_index,
            Pokedex.formatName(version.name),
          ])
        )}
        <DescriptionList term={<h2>Forms</h2>}>
          A list of forms this Pokémon can take on.
        </DescriptionList>
        {table(
          ["Name"],
          pokemon.forms.map((pokemonFrom) => [
            Pokedex.formatName(pokemonFrom.name),
          ])
        )}
        <DescriptionList term={<h2>Moves</h2>}>
          A list of moves along with learn methods and level details pertaining
          to specific version groups.
        </DescriptionList>
        {table(
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
              moveElement.version_group_details.map((versionGroupDetail) => [
                versionGroupDetail.order, // ??
                versionGroupDetail.level_learned_at,
                Pokedex.formatName(versionGroupDetail.move_learn_method.name),
                Pokedex.formatName(versionGroupDetail.version_group.name),
              ])
            ),
          ])
        )}
      </>
    );
  }
);
