import { Pokedex } from "@/(shared)/pokedex-promise-v2";

const withDefaultProps = (values) => ({
  lastModified: new Date(),
  changeFrequency: "yearly",
  ...values,
});

export default async () => [
  ...Pokedex.api.groupNames.map((groupName) =>
    withDefaultProps({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${groupName}`,
    })
  ),
  ...(
    await Promise.all(
      Pokedex.api.groupNames.map(async (groupName) =>
        (
          await Pokedex.api(groupName, "getList")()
        ).results.map((item) =>
          withDefaultProps({
            url: `${
              process.env.NEXT_PUBLIC_BASE_URL
            }/${groupName}/${encodeURIComponent(item.name)}`,
          })
        )
      )
    )
  ).flat(),
];
