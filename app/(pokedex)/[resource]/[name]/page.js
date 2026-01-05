import Cycled from "cycled";
import { pick } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { notFound } from "next/navigation";
import { Activity } from "react";

import { list } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { getOgUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";

import configs from "./configs";
import { Avatar } from "./configs/components";
import HotkeyLink from "./hotkey-link";

export const generateStaticParams = async ({ params }) =>
  (await Pokedex.api(params.resource, "rootEndpoint")()).results
    .slice(0, configs[params.resource].limit)
    .map((item) => ({ name: item.name }));

export default async ({ params }) => {
  params = await params;

  const items = await Pokedex.api(params.resource, "rootEndpoint")();
  const names = items.results.map((item) => item.name);

  params.name =
    // /move-category/damage%2Braise > /move-category/damage+raise
    decodeURIComponent(params.name);

  if (names.includes(params.name)) {
    const config = configs[params.resource];
    const cycled = new Cycled(names);
    const index = names.findIndex((name) => name === params.name);
    const item = items.results[index];

    cycled.index = index;

    const context = {
      data: await Pokedex.api.getResource(item.url),
      index,
      routeParams: params,
    };

    const avatarSrc = config.getAvatarSrc({ context });
    const [nextName, previousName] = [cycled.peek(1), cycled.peek(-1)];

    return (
      <>
        {avatarSrc && (
          <Avatar
            src={avatarSrc}
            style={{
              alignSelf: "center",
              margin: "unset",
              position: "fixed",
            }}
          />
        )}
        <Pokedex
          canonical={`/${params.resource}/${params.name}`}
          descriptions={{
            index: (
              <>
                {index + 1}
                <span style={{ color: "var(--color-fd-muted-foreground)" }}>
                  /{items.count}
                </span>
              </>
            ),
            ...pick(context.data, ["game_index", "id", "order"]),
            previous: (
              <HotkeyLink
                href={`/${params.resource}/${previousName}`}
                keys="left"
              >
                {titleCase(previousName)}
              </HotkeyLink>
            ),
            // eslint-disable-next-line perfectionist/sort-objects
            next: (
              <HotkeyLink href={`/${params.resource}/${nextName}`} keys="right">
                {titleCase(nextName)}
              </HotkeyLink>
            ),
            // eslint-disable-next-line perfectionist/sort-objects
            links: list.inline(
              <Link href={`/${params.resource}`}>List</Link>,
              <Link href={`/random/${params.resource}`}>Random</Link>,
              <Link href={item.url}>API</Link>
            ),
          }}
          favicon={config.getFavicon({ context })}
          ogUrl={getOgUrl({
            title: titleCase(params.name),
            topic: titleCase(params.resource),
          })}
          renderTitle={() => (
            <>
              {titleCase(params.name)}
              <span
                style={{
                  color: "var(--color-fd-muted-foreground)",
                }}
              >
                {" ("}
                {titleCase(params.resource)}
                {")"}
              </span>
            </>
          )}
          title={`${titleCase(params.name)} (${titleCase(params.resource)})`}
        >
          {(await generateStaticParams({ params })).some(
            (param) => param.name === params.name
          ) || (
            <Callout
              title={`Static limit exceeded (${config.limit})`}
              type="warn"
            >
              This page wasn’t pre-generated because it exceeds the static
              limit. Content may load slower or change over time.
            </Callout>
          )}
          <Activity>{await config.getContent({ context })}</Activity>
        </Pokedex>
      </>
    );
  } else notFound();
};
