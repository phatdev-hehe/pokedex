import { Pokedex } from "@/pokedex-promise-v2";

const { generateMetadata, generateStaticParams, withData } =
  await Pokedex.buildPage({
    getList: "getItemsList",
    getData: "getItemByName",
  });

export { generateMetadata, generateStaticParams };

export default withData(
  /** @param {{ data: Item }} */
  ({ data: item }) => {}
);
