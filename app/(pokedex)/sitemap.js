import { Pokedex } from "@/(shared)/pokedex-promise-v2";

export default async () =>
  (
    await Promise.all(
      Pokedex.api.endpoints.map(async (apiEndpoint) =>
        (
          await Pokedex.api(apiEndpoint, "getList")()
        ).results.map((item) => ({
          url: `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/${apiEndpoint}/${encodeURIComponent(item.name)}`,
          lastModified: new Date(),
          changeFrequency: "yearly",
        }))
      )
    )
  ).flat();
