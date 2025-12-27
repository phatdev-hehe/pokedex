import { Feed } from "feed";

import data from "@/app/api/local-data/data.json";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { getOgUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";

export const feed = new Feed({
  id: process.env.NEXT_PUBLIC_SITE_URL,
  link: process.env.NEXT_PUBLIC_SITE_URL,
  title: process.env.NEXT_PUBLIC_SITE_TITLE,
});

for (const [key, value] of Object.entries(data)) {
  const categoryName = titleCase(key);

  for (const value1 of value) {
    const link = `${process.env.NEXT_PUBLIC_SITE_URL}/${key}/${value1}`;
    const title = titleCase(value1);

    feed.addItem({
      category: [{ name: categoryName }],
      date: Pokedex.date,
      id: link,
      image: {
        title: `${title} (${categoryName})`,
        type: "image/png",
        url: getOgUrl({ title, topic: categoryName }),
      },
      link,
      title,
    });
  }
}
