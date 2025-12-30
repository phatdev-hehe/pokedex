import Cycled from "cycled";
import { Callout } from "fumadocs-ui/components/callout";
import { notFound } from "next/navigation";

import { list } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { getOgUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";

import { Avatar } from "./components";
import configs from "./configs";

export const generateStaticParams = async ({ params }) =>
  (await Pokedex.api(params["route-name"], "rootEndpoint")()).results
    .slice(0, configs[params["route-name"]].limit)
    .map((item) => ({ name: item.name }));

export default async ({ params }) => {
  params = await params;

  const items = await Pokedex.api(params["route-name"], "rootEndpoint")();
  const names = items.results.map((item) => item.name);

  params.name =
    // name: "a%2Bb" > "a+b"
    // /move-category/damage+raise
    decodeURIComponent(params.name);

  if (names.includes(params.name)) {
    const config = configs[params["route-name"]];
    const cycled = new Cycled(names);
    const index = names.findIndex((name) => name === params.name);
    const item = items.results[index];

    cycled.index = index;

    const context = {
      data: await Pokedex.api.getResource(item.url),
      index,
      routeParams: params,
    };

    const avatarSrc = config.getAvatar({ context });
    const [nextName, previousName] = [cycled.peek(1), cycled.peek(-1)];

    return (
      <>
        {avatarSrc && (
          <Avatar
            src={avatarSrc}
            style={{
              alignSelf: "center",
              margin: 0,
              position: "fixed",
            }}
          />
        )}
        <Pokedex
          canonical={`/${params["route-name"]}/${params.name}`}
          descriptions={{
            game_index: context.data.game_index,
            id: context.data.id,
            index: (
              <>
                {index + 1}
                <span style={{ color: "var(--color-fd-muted-foreground)" }}>
                  /{items.count}
                </span>
              </>
            ),
            order: context.data.order,
            previous: (
              <Link href={`/${params["route-name"]}/${previousName}`}>
                {titleCase(previousName)}
              </Link>
            ),
            // eslint-disable-next-line perfectionist/sort-objects
            next: (
              <Link href={`/${params["route-name"]}/${nextName}`}>
                {titleCase(nextName)}
              </Link>
            ),
            // eslint-disable-next-line perfectionist/sort-objects
            links: list.inline(
              <Link href={`/${params["route-name"]}`}>List</Link>,
              <Link href={`/random/${params["route-name"]}`}>Random</Link>,
              <Link href={item.url}>API</Link>
            ),
          }}
          favicon={config.getFavicon({ context })}
          ogUrl={getOgUrl({
            title: titleCase(params.name),
            topic: titleCase(params["route-name"]),
          })}
          renderTitle={() => (
            <span>
              {titleCase(params.name)}
              <span
                style={{
                  color: "var(--color-fd-muted-foreground)",
                }}
              >
                {" ("}
                {titleCase(params["route-name"])}
                {")"}
              </span>
            </span>
          )}
          title={`${titleCase(params.name)} (${titleCase(
            params["route-name"]
          )})`}
        >
          {(await generateStaticParams({ params })).some(
            (item) => item.name === params.name
          ) || (
            <Callout
              title={`Static limit exceeded (${config.limit})`}
              type="warn"
            >
              This page wasn’t pre-built because it’s outside the static
              generation limit. Data changes may cause inconsistent results.
            </Callout>
          )}
          {await config.getContent({ context })}
        </Pokedex>
      </>
    );
  } else notFound();
};
