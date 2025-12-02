import { Pokedex } from "@/lib/pokedex-promise-v2";
import { DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import RandomRedirect from "./random-redirect";

export default async ({ params }) => {
  const { "route-name": routeName } = await params;

  if (!Pokedex.api.routeNames.includes(routeName)) notFound();

  return (
    <DocsBody>
      <RandomRedirect
        links={(await Pokedex.api(routeName, "rootEndpoint")()).results.map(
          (item) => `/${routeName}/${item.name}`
        )}
      />
    </DocsBody>
  );
};
