import { highlighter, table, tabs } from "@/components";
import { math } from "@/components/katex";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineDetailPage("growth-rate");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
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
          math(String.raw`${growthRate.formula}`),
        ],
      ])}
      {tabs({
        levels: table.pagination(growthRate.levels, {
          renderRows: ({ context }) => [context.level, context.experience],
          showIndex: false,
          thead: [undefined, "experience"],
        }),
        ...Page.tabs.descriptions(growthRate.descriptions),
        ...Page.tabs.pokemonSpecies(growthRate.pokemon_species),
      })}
    </>
  );
});
