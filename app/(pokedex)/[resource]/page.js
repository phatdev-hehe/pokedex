import { notFound } from "next/navigation";

import { list, table } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { getOgUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";

export default async ({ params }) => {
  params = await params;

  if (Pokedex.api.routes.includes(params.resource)) {
    const title = `${titleCase(`${params.resource} list`)}`;
    const items = await Pokedex.api(params.resource, "rootEndpoint")();
    const names = items.results.map((item) => item.name);

    return (
      <Pokedex
        canonical={`/${params.resource}`}
        descriptions={{
          count: items.count,
          links: list.inline(
            <Link href={`/random/${params.resource}`}>Random</Link>
          ),
        }}
        ogUrl={getOgUrl({
          title,
          topic: items.count,
        })}
        renderTitle={() => (
          <>
            {titleCase(params.resource)}{" "}
            <span style={{ color: "var(--color-fd-muted-foreground)" }}>
              List
            </span>
          </>
        )}
        title={title}
      >
        {table.pagination(names, {
          renderRows: ({ context }) => [
            <Link href={`/${params.resource}/${context}`}>
              {titleCase(context)}
            </Link>,
          ],
        })}
      </Pokedex>
    );
  } else notFound();
};
