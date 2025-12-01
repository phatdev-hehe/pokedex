import { Pokedex } from "@/lib/pokedex-promise-v2";
import { getOpengraphUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";
import { Feed } from "feed";

export const feed = new Feed({
  id: process.env.NEXT_PUBLIC_BASE_URL,
  link: process.env.NEXT_PUBLIC_BASE_URL,
});

await Promise.all(
  Pokedex.api.groupNames.map(async (groupName) => {
    (await Pokedex.api(groupName, "getList")()).results.map((item) => {
      const link = `${process.env.NEXT_PUBLIC_BASE_URL}/${groupName}/${item.name}`;
      const title = titleCase(item.name);
      const categoryName = titleCase(groupName);

      feed.addItem({
        title,
        id: link,
        link,
        category: [{ name: categoryName }],
        image: getOpengraphUrl(`${title} (${categoryName})`).toString(),
        date: new Date(),
      });
    });
  })
);
