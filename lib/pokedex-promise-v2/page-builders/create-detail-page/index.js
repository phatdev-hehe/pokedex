import { Link } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { noop } from "@/utils";
import { titleCase } from "@/utils/title-case";
import Cycled from "cycled";
import { Callout } from "fumadocs-ui/components/callout";
import { notFound } from "next/navigation";
import Avatar from "./avatar";
import tabs from "./tabs";

export default async (
  routeName,
  { getAvatar = noop, staticLimit = Infinity, getFavicon = noop } = {}
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

        const getCurrentItem = (item) => item.name === name;
        const resourceUrl = items.find(getCurrentItem).url;

        const context = {
          index: items.findIndex(getCurrentItem),
          data: await Pokedex.api.getResource(resourceUrl),
          names,
          title: createTitle(name),
          cycled,
        };

        cycled.index = context.index;

        const avatarSrc = getAvatar({ context });
        const [nextName, previousName] = [cycled.peek(1), cycled.peek(-1)];

        return (
          <>
            <link rel="icon" href={getFavicon({ context })} />
            {avatarSrc && (
              <Avatar
                style={{
                  alignSelf: "center",
                  position: "fixed",
                  margin: 0,
                }}
                src={avatarSrc}
              />
            )}
            <Pokedex
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
              title={context.title}
              descriptions={[
                ["id", context.data.id],
                ["order", context.data.order],
                ["game_index", context.data.game_index],
                [
                  "index",
                  <>
                    {context.index + 1}
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
                    <Link href={`/${routeName}`}>List Page</Link>
                    {" & "}
                    <Link href={resourceUrl}>API</Link>
                  </>,
                ],
              ]}
            >
              {staticParams.includes(name) || (
                <Callout
                  type="warn"
                  title={`Static limit exceeded (${staticLimit})`}
                >
                  This page wasn’t pre-built because it’s outside the static
                  generation limit. Data changes may cause inconsistent results.
                </Callout>
              )}
              {await render({ context })}
            </Pokedex>
          </>
        );
      };
    },
    {
      tabs,
      generateStaticParams: () => staticParams.map((name) => ({ name })),
      generateMetadata: async ({ params }) => {
        const { name } = await params;

        return {
          title: createTitle(name),
        };
      },
    }
  );
};
