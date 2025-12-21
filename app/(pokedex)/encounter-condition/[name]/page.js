import { descriptionList, table, tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("encounter-condition");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type EncounterCondition */
  const encounterCondition = context.data;

  return tabs({
    values: (
      <>
        {descriptionList(
          undefined,
          "A list of possible values for this encounter condition."
        )}
        {table.pagination(encounterCondition.values, {
          renderRows: ({ context }) => [
            <Link href={`/encounter-condition-value/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        })}
      </>
    ),
    ...Page.tabs.names(encounterCondition.names),
  });
});
