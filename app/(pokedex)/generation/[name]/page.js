import { highlighter, table, tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("generation");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Generation */
  const generation = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The main region travelled in this generation.",
            "main region"
          ),
          <Link href={`/region/${generation.main_region.name}`}>
            {titleCase(generation.main_region.name)}
          </Link>,
        ],
      ])}
      {tabs({
        abilities: table.pagination(generation.abilities, {
          renderRows: ({ context }) => [
            <Link href={`/ability/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        moves: table.pagination(generation.moves, {
          renderRows: ({ context }) => [
            <Link href={`/move/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        pokemon_species: table.pagination(generation.pokemon_species, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon-species/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        types: table.pagination(generation.types, {
          renderRows: ({ context }) => [
            <Link href={`/type/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        version_groups: table.pagination(generation.version_groups, {
          renderRows: ({ context }) => [
            <Link href={`/version-group/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        ...Page.tabs.names(generation.names),
      })}
    </>
  );
});
