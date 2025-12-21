import { table, tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("pal-park-area");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PalParkArea */
  const palParkArea = context.data;

  return tabs({
    pokemon_encounters: table.pagination(palParkArea.pokemon_encounters, {
      renderRows: ({ context }) => [
        <Link href={`/pokemon-species/${context.pokemon_species.name}`}>
          {titleCase(context.pokemon_species.name)}
        </Link>,
        context.base_score,
        context.rate,
      ],
      thead: ["pokemon_species", "base_score", "rate"],
    }),
    ...Page.tabs.names(palParkArea.names),
  });
});
