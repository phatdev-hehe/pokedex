import { highlighter, Link, table, tabs, ul } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("characteristic");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
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
          highlighter("The stat which results in this characteristic.", "stat"),
          <Link href={`/stat/${characteristic.highest_stat.name}`}>
            {titleCase(characteristic.highest_stat.name)}
          </Link>,
        ],
        [
          highlighter(
            "The possible values of the highest stat that would result in a Pokémon recieving this characteristic when divided by 5.",
            "possible values"
          ),
          ul(...characteristic.possible_values),
        ],
      ])}
      {tabs(Page.tabs.descriptions(characteristic.descriptions))}
    </>
  );
});
