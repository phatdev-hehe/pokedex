import { Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("berry-firmness");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type BerryFirmness */
  const berryFirmness = context.data;

  return tabs({
    berries: table.pagination(berryFirmness.berries, {
      renderRows: ({ context }) => [
        <Link href={`/berry/${context.name}`}>{titleCase(context.name)}</Link>,
      ],
    }),
    ...Page.tabs.names(berryFirmness.names),
  });
});
