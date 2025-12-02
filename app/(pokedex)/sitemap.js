import { Pokedex } from "@/lib/pokedex-promise-v2";

const withDefaultProps = (values) => ({
  lastModified: new Date(),
  changeFrequency: "yearly",
  ...values,
});

export default async () => [
  ...Pokedex.api.routeNames.map((routeName) =>
    withDefaultProps({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${routeName}`,
    })
  ),
  ...(
    await Promise.all(
      Pokedex.api.routeNames.map(async (routeName) =>
        (
          await Pokedex.api(routeName, "getList")()
        ).results.map((item) =>
          withDefaultProps({
            url: `${
              process.env.NEXT_PUBLIC_BASE_URL
            }/${routeName}/${encodeURIComponent(item.name)}`,
          })
        )
      )
    )
  ).flat(),
];
