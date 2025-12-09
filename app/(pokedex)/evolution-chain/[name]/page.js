import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("evolution-chain", {
  staticLimit: process.env.DEFAULT_STATIC_LIMIT,
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type EvolutionChain */
  const evolutionChain = context.data;
});
