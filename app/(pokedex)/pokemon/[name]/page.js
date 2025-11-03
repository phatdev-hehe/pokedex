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
          ["", "Base stat"],
          pokemon.stats.map((pokemonStat) => [
            Pokedex.formatName(pokemonStat.stat.name),
            pokemonStat.base_stat,
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
          </tr>
        )}
      </>
    );
  }
);
