import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("location-area", {
  staticLimit: process.env.DEFAULT_STATIC_LIMIT,
});

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type LocationArea */
  const locationArea = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The region this location area can be found in.",
            "location"
          ),
          <Link href={`/location/${locationArea.location.name}`}>
            {titleCase(locationArea.location.name)}
          </Link>,
        ],
      ])}
      {tabs({
        encounter_method_rates: table.pagination(
          locationArea.encounter_method_rates,
          {
            renderRows: ({ context }) => [
              <Link href={`/encounter-method/${context.encounter_method.name}`}>
                {titleCase(context.encounter_method.name)}
              </Link>,
              table.pagination(context.version_details, {
                renderRows: ({ context }) => [
                  <Link href={`/version/${context.version.name}`}>
                    {titleCase(context.version.name)}
                  </Link>,
                  context.rate,
                ],
                thead: [undefined, "rate"],
              }),
            ],
            thead: [undefined, "version_details"],
          }
        ),
        pokemon_encounters: table.pagination(locationArea.pokemon_encounters, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon/${context.pokemon.name}`}>
              {titleCase(context.pokemon.name)}
            </Link>,
            Page.tabs.versionDetails(
              context.version_details,
              Page.tabs.RAW_CONTENT
            ),
          ],
          thead: [undefined, "version_details"],
        }),
        ...Page.tabs.names(locationArea.names),
      })}
    </>
  );
});
