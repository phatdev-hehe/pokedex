import { DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

import { RandomRedirect } from "@/components/router";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export default async ({ params }) => {
  params = await params;

  if (!Pokedex.api.routeNames.includes(params["route-name"])) notFound();

  return (
    <DocsBody>
      <RandomRedirect
        links={(
          await Pokedex.api(params["route-name"], "rootEndpoint")()
        ).results.map((item) => `/${params["route-name"]}/${item.name}`)}
      />
    </DocsBody>
  );
};
