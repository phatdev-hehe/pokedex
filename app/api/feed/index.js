import data from "@/app/api/local-data/data.json";
import { getOpengraphUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";
import { Feed } from "feed";

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
      title,
      id: link,
      link,
      category: [{ name: categoryName }],
      image: getOpengraphUrl({ title: `${title} (${categoryName})` }),
      date: new Date(),
    });
  }
}
