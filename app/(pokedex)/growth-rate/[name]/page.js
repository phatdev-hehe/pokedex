import { highlighter, table, tabs } from "@/components";
import { inlineMath } from "@/components/katex";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

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
        ...Page.tabs.descriptions(growthRate.descriptions),
      })}
    </>
  );
});
