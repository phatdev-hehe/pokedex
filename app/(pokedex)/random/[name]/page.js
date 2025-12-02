import { Pokedex } from "@/lib/pokedex-promise-v2";
import { DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import RandomRedirect from "./random-redirect";

export default async ({ params }) => {
  const { name } = await params;

  if (!Pokedex.api.groupNames.includes(name)) notFound();

  return (
    <DocsBody>
      <RandomRedirect
        links={(await Pokedex.api(name, "getList")()).results.map(
          (item) => `/${name}/${item.name}`
        )}
      />
    </DocsBody>
  );
};
