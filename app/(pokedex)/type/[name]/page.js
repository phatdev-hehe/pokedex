import { Pokedex } from "@/shared/pokedex-promise-v2";

const page = await Pokedex.createPage({
  getList: "getTypesList",
  getData: "getTypeByName",
  titleSuffix: "Type",
});

export const generateMetadata = page.generateMetadata;
export const generateStaticParams = page.generateStaticParams;

export default page.withData(({ data }) => {
  /** @type Type */
  const type = data;
});
