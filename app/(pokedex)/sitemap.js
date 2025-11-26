import { Pokedex } from "@/(shared)/pokedex-promise-v2";

export default async () =>
  (
    await Promise.all(
      Pokedex.api.groupNames.map(async (groupName) =>
        (
          await Pokedex.api(groupName, "getList")()
        ).results.map((item) => ({
          url: `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/${groupName}/${encodeURIComponent(item.name)}`,
          lastModified: new Date(),
          changeFrequency: "yearly",
        }))
      )
    )
  ).flat();
