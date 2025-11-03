import { Pokedex } from "@/shared/pokedex-promise-v2";
import { table } from "@/shared/table";

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
      (pokemonStat) => pokemonStat.base_stat
    );

    return (
      <>
        <h2>Stats</h2>
        {table(
          [undefined, "Base stat", "Effort"],
          pokemon.stats.map((pokemonStat) => [
            Pokedex.formatName(pokemonStat.stat.name),
            pokemonStat.base_stat,
            pokemonStat.effort,
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
        <h2>Abilities</h2>
        {table(
          [undefined, "Hidden", "Slot"],
          pokemon.abilities.map((pokemonAbility) => [
            Pokedex.formatName(pokemonAbility.ability.name),
            pokemonAbility.is_hidden && (
              <input readOnly type="checkbox" checked />
            ),
            pokemonAbility.slot,
          ])
        )}
      </>
    );
  }
);
