import { highlighter, table } from "@/(shared)/components";
import { math } from "@/(shared)/components/katex";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("growth-rate");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type GrowthRate */
  const growthRate = context.data;

  return (
    <>
      {table(undefined, [
        ["Id", growthRate.id],
        [
          highlighter(
            "The formula used to calculate the rate at which the Pokémon species gains level.",
            "formula"
          ),
          math(String.raw`${growthRate.formula}`),
        ],
      ])}
      {Page.tabs(
        Page.tabs.descriptions(growthRate.descriptions),
        [
          "levels",
          table.pagination(growthRate.levels, {
            showIndex: false,
            thead: [undefined, "experience"],
            renderFirstItem: ({ context }) => context.level,
            renderItems: ({ context }) => [context.experience],
          }),
        ],
        Page.tabs.pokemonSpecies(growthRate.pokemon_species)
      )}
    </>
  );
});
