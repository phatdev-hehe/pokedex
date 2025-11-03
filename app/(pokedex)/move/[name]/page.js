import { Pokedex } from "@/pokedex-promise-v2";

const { generateMetadata, generateStaticParams, withData } =
  await Pokedex.buildPage({
    getList: "getMovesList",
    getData: "getMoveByName",
  });

export { generateMetadata, generateStaticParams };

export default withData(
  /** @param {{ data: Move }} */
  ({ data: move }) => {}
);
