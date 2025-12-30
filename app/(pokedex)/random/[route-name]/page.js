import { DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

import { Pokedex } from "@/lib/pokedex-promise-v2";

import RandomRedirect from "./random-redirect";

export default async ({ params }) => {
  params = await params;

  if (Pokedex.api.routeNames.includes(params["route-name"]))
    return (
      <DocsBody>
        <RandomRedirect
          links={(
            await Pokedex.api(params["route-name"], "rootEndpoint")()
          ).results.map((item) => `/${params["route-name"]}/${item.name}`)}
        />
      </DocsBody>
    );
  else notFound();
};
