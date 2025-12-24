import { tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("evolution-trigger");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
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
    ...Page.tabs.names(evolutionTrigger.names),
  });
});
