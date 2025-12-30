import { DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

import { Pokedex } from "@/lib/pokedex-promise-v2";

import RandomRedirect from "./random-redirect";

export default async ({ params }) => {
  params = await params;

  if (Pokedex.api.routeNames.includes(params.resource))
    return (
      <DocsBody>
        <RandomRedirect
          links={(
            await Pokedex.api(params.resource, "rootEndpoint")()
          ).results.map((item) => `/${params.resource}/${item.name}`)}
        />
      </DocsBody>
    );
  else notFound();
};
