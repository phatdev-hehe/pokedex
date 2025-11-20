import { Pokedex } from "@/(shared)/pokedex-promise-v2";

export default async () =>
  (
    await Promise.all(
      Pokedex.api.types.map(async (apiType) =>
        (
          await Pokedex.api(apiType, "getList")()
        ).results.map((item) => ({
          url: `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/${apiType}/${encodeURIComponent(item.name)}`,
          lastModified: new Date(),
          changeFrequency: "yearly",
        }))
      )
    )
  ).flat();
