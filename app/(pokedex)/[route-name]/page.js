import { list, table } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { getOgUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";

export default async ({ params }) => {
  params = await params;

  const title = `${titleCase(`${params["route-name"]} list`)}`;
  const items = await Pokedex.api(params["route-name"], "rootEndpoint")();
  const names = items.results.map((item) => item.name);

  return (
    <Pokedex
      canonical={`/${params["route-name"]}`}
      descriptions={{
        count: items.count,
        links: list.inline(
          <Link href={`/random/${params["route-name"]}`}>Random</Link>
        ),
      }}
      ogUrl={getOgUrl({
        title,
        topic: items.count,
      })}
      title={title}
    >
      {table.pagination(names, {
        renderRows: ({ context }) => [
          <Link href={`/${params["route-name"]}/${context}`}>
            {titleCase(context)}
          </Link>,
        ],
      })}
    </Pokedex>
  );
};
