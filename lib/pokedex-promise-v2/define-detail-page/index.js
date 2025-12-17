import Cycled from "cycled";
import { noop } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { notFound } from "next/navigation";

import { inlineList, Link, noContent } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { getOgUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";

import Avatar from "./avatar";
import tabs from "./tabs";

export default async (
  routeName,
  { getAvatar = noop, getFavicon = noop, staticLimit = Infinity } = {}
) => {
  const { results: items } = await Pokedex.api(routeName, "rootEndpoint")();
  const names = items.map((item) => item.name);
  const staticParams = names.slice(0, staticLimit);

  return Object.assign(
    (render) =>
      async ({ params }) => {
        params = await params;

        if (!names.includes(params.name)) notFound();

        const cycled = new Cycled(names);
        const index = names.findIndex((name) => name === params.name);
        const item = items[index];

        cycled.index = index;

        const context = {
          data: await Pokedex.api.getResource(item.url),
          index,
        };

        const avatarSrc = getAvatar({ context });
        const [nextName, previousName] = [cycled.peek(1), cycled.peek(-1)];

        return (
          <>
            <link href={getFavicon({ context })} rel="icon" />
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
              canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/${routeName}/${params.name}`}
              descriptions={{
                id: context.data.id,
                game_index: context.data.game_index, // eslint-disable-line perfectionist/sort-objects
                index: (
                  <>
                    {index + 1}
                    <span style={{ color: "var(--color-fd-muted-foreground)" }}>
                      /{items.length}
                    </span>
                  </>
                ),
                order: context.data.order,
                previous: (
                  <Link href={`/${routeName}/${previousName}`}>
                    {titleCase(previousName)}
                  </Link>
                ),
                // eslint-disable-next-line perfectionist/sort-objects
                next: (
                  <Link href={`/${routeName}/${nextName}`}>
                    {titleCase(nextName)}
                  </Link>
                ),
                // eslint-disable-next-line perfectionist/sort-objects
                links: inlineList(
                  <Link href={`/${routeName}`}>List</Link>,
                  <Link href={`/random/${routeName}`}>Random</Link>,
                  <Link href={item.url}>API</Link>,
                  <Link
                    href={encodeURI(
                      `${process.env.NEXT_PUBLIC_GITHUB_URL}/blob/main/app/(pokedex)/${routeName}/[name]/page.js`
                    )}
                  >
                    GitHub
                  </Link>
                ),
              }}
              ogUrl={getOgUrl({
                title: titleCase(params.name),
                topic: titleCase(routeName),
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
                    {titleCase(routeName)}
                    {")"}
                  </span>
                </span>
              )}
              title={`${titleCase(params.name)} (${titleCase(routeName)})`}
            >
              {staticParams.includes(params.name) || (
                <Callout
                  title={`Static limit exceeded (${staticLimit})`}
                  type="warn"
                >
                  This page wasn’t pre-built because it’s outside the static
                  generation limit. Data changes may cause inconsistent results.
                </Callout>
              )}
              {(await render({ context })) ?? noContent()}
            </Pokedex>
          </>
        );
      },
    {
      generateStaticParams: () => staticParams.map((name) => ({ name })),
      tabs,
    }
  );
};
