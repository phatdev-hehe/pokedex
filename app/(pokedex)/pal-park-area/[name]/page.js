import { Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("pal-park-area");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PalParkArea */
  const palParkArea = context.data;

  return tabs(Page.tabs.names(palParkArea.names), [
    "pokemon_encounters",
    table.pagination(palParkArea.pokemon_encounters, {
      renderRows: ({ context }) => [
        <Link href={`/pokemon-species/${context.pokemon_species.name}`}>
          {titleCase(context.pokemon_species.name)}
        </Link>,
        context.base_score,
        context.rate,
      ],
      thead: ["pokemon_species", "base_score", "rate"],
    }),
  ]);
});
