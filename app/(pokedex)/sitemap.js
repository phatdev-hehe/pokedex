import { encode } from "entities";

import { Pokedex } from "@/lib/pokedex-promise-v2";

const withDefaultProps = ({ url, ...rest }) => ({
  changeFrequency: "yearly",
  lastModified: Pokedex.date,
  url: encode(url),
  ...rest,
});

export default async () => [
  ...Pokedex.api.routes.map((route) =>
    withDefaultProps({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${route}`,
    })
  ),
  ...(
    await Promise.all(
      Pokedex.api.routes.map(async (route) =>
        (
          await Pokedex.api(route, "rootEndpoint")()
        ).results.map((item) =>
          withDefaultProps({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${route}/${item.name}`,
          })
        )
      )
    )
  ).flat(),
];
