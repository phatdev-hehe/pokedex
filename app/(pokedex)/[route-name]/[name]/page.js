import { Pokedex } from "@/lib/pokedex-promise-v2";

export const generateStaticParams = async ({ params }) =>
  (await Pokedex.api(params["route-name"], "rootEndpoint")()).results.map(
    (item) => ({ name: item.name })
  );

export default async ({ params }) => (await params).name;
