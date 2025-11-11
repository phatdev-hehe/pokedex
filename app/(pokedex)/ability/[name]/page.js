import { Pokedex } from "@/shared/pokedex-promise-v2";

const Page = await Pokedex.createPage({
  getList: "getAbilitiesList",
  getData: "getAbilityByName",
  titleSuffix: "ability",
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page.withData(({ data }) => {
  /** @type Ability */
  const ability = data;

  return <Page.Root></Page.Root>;
});
