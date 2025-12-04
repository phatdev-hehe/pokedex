import { Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("encounter-condition");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type EncounterCondition */
  const encounterCondition = context.data;

  return tabs(Page.tabs.names(encounterCondition.names), [
    "values",
    table.pagination(encounterCondition.values, {
      renderRows: ({ context }) => [
        <Link href={`/encounter-condition-value/${context.name}`}>
          {titleCase(context.name)}
        </Link>,
      ],
    }),
  ]);
});
