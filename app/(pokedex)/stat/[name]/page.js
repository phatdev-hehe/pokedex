import { sections, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";

const page = await Pokedex.createPage({
  getList: "getStatsList",
  getData: "getStatByName",
  titleSuffix: "Stat",
});

export const generateMetadata = page.generateMetadata;
export const generateStaticParams = page.generateStaticParams;

export default page.withData(({ data }) => {
  /** @type Stat */
  const stat = data;

  return (
    <>
      {sections([
        "Affecting Items",
        undefined,
        table(
          ["Name"],
          stat.affecting_items.map((affectingItem) => [
            Pokedex.formatName(affectingItem.name),
          ])
        ),
      ])}
    </>
  );
});
