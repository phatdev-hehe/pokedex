import { table, tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("egg-group");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
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
    ...Page.tabs.names(eggGroup.names),
  });
});
