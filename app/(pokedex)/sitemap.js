import { Pokedex } from "@/lib/pokedex-promise-v2";

const withDefaultProps = (values) => ({
  changeFrequency: "yearly",
  lastModified: new Date(),
  ...values,
});

export default async () => [
  ...Pokedex.api.routeNames.map((routeName) =>
    withDefaultProps({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${routeName}`,
    })
  ),
  ...(
    await Promise.all(
      Pokedex.api.routeNames.map(async (routeName) =>
        (
          await Pokedex.api(routeName, "rootEndpoint")()
        ).results.map((item) =>
          withDefaultProps({
            url: `${
              process.env.NEXT_PUBLIC_SITE_URL
            }/${routeName}/${encodeURIComponent(item.name)}`,
          })
        )
      )
    )
  ).flat(),
];
