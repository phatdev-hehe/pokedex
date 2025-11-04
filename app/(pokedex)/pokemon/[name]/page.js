import { Audio, Checkbox, DescriptionList, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";

const { generateMetadata, generateStaticParams, withData } =
  await Pokedex.buildPage({
    getList: "getPokemonsList",
    getData: "getPokemonByName",
  });

export { generateMetadata, generateStaticParams };

export default withData(
  /** @param {{ data: Pokemon }} */
  ({ data: pokemon }) => {
    const pokemonBaseStats = pokemon.stats.map(
      (statElement) => statElement.base_stat
    );

    return (
      <>
        {table(
          [undefined, "Value"],
          [
            ["Id", pokemon.id],
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
          ]
        )}
        <DescriptionList term={<h2>Stats</h2>}>
          A list of base stat values for this Pokémon.
        </DescriptionList>
        {table(
          [undefined, "Base stat", "Effort"],
          pokemon.stats.map((statElement) => [
            Pokedex.formatName(statElement.stat.name),
            statElement.base_stat,
            !!statElement.effort && statElement.effort,
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
