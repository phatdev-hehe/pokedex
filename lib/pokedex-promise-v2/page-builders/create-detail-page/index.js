import Cycled from "cycled";
import { noop } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { notFound } from "next/navigation";

import { Link, noContent } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { getOpengraphUrl } from "@/utils";
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

  const createTitle = (input) => {
    const title = titleCase(input);

    return `${title} (${titleCase(routeName)})`;
  };

  return Object.assign(
    (render) => {
      const cycled = new Cycled(names);

      return async ({ params }) => {
        const { name } = await params;

        if (!names.includes(name)) notFound();

        const index = items.findIndex((item) => item.name === name);
        const resourceUrl = items[index].url;

        cycled.index = index;

        const context = {
          data: await Pokedex.api.getResource(resourceUrl),
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
              descriptions={[
                ["id", context.data.id],
                ["order", context.data.order],
                ["game_index", context.data.game_index],
                [
                  "index",
                  <>
                    {index + 1}
                    <span style={{ color: "var(--color-fd-muted-foreground)" }}>
                      /{items.length}
                    </span>
                  </>,
                ],
                [
                  "previous",
                  <Link href={`/${routeName}/${previousName}`}>
                    {titleCase(previousName)}
                  </Link>,
                ],
                [
                  "next",
                  <Link href={`/${routeName}/${nextName}`}>
                    {titleCase(nextName)}
                  </Link>,
                ],
                [
                  "links",
                  <>
                    <Link href={`/${routeName}`}>List</Link>
                    {", "}
                    <Link href={resourceUrl}>API</Link>
                  </>,
                ],
              ]}
              ogUrl={getOpengraphUrl({
                title: titleCase(name),
                topic: titleCase(routeName),
              })}
              renderTitle={() => (
                <span>
                  {titleCase(name)}
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
              title={createTitle(name)}
            >
              {staticParams.includes(name) || (
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
      };
    },
    {
      generateMetadata: async ({ params }) => {
        const { name } = await params;

        return {
          title: createTitle(name),
        };
      },
      generateStaticParams: () => staticParams.map((name) => ({ name })),
      tabs,
    }
  );
};
