import { table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";

const page = await Pokedex.createPage({
  getList: "getMovesList",
  getData: "getMoveByName",
  titleSuffix: "Move",
});

export const generateMetadata = page.generateMetadata;
export const generateStaticParams = page.generateStaticParams;

export default page.withData(({ data }) => {
  /** @type Move */
  const move = data;

  return (
    <>
      {table(undefined, [
        [
          "The percent value of how likely this move is to be successful.",
          move.accuracy,
        ],
      ])}
    </>
  );
});
