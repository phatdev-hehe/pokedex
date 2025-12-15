import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("encounter-condition-value");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type EncounterConditionValue */
  const encounterConditionValue = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The condition this encounter condition value pertains to.",
            "encounter condition"
          ),
          <Link
            href={`/encounter-condition/${encounterConditionValue.condition.name}`}
          >
            {titleCase(encounterConditionValue.condition.name)}
          </Link>,
        ],
      ])}
      {tabs(Page.tabs.names(encounterConditionValue.names))}
    </>
  );
});
