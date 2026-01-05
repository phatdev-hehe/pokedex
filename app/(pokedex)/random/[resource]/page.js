import { notFound } from "next/navigation";

import { Pokedex } from "@/lib/pokedex-promise-v2";

import RandomRedirect from "./random-redirect";

export default async ({ params }) => {
  params = await params;

  if (Pokedex.api.routes.includes(params.resource))
    return (
      <Pokedex>
        <RandomRedirect
          hrefs={(
            await Pokedex.api(params.resource, "rootEndpoint")()
          ).results.map((item) => `/${params.resource}/${item.name}`)}
        />
      </Pokedex>
    );
  else notFound();
};
