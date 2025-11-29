import { Link } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { noop } from "@/utils";
import { titleCase } from "@/utils/title-case";
import Cycled from "cycled";
import { Callout } from "fumadocs-ui/components/callout";
import { notFound } from "next/navigation";
import Layout from "../layout";
import Avatar from "./avatar";
import tabs from "./tabs";

export default async (
  apiGroup,
  { getAvatar = noop, limitStaticParams = Infinity, getFavicon = noop } = {}
) => {
  const { results: items } = await Pokedex.api(apiGroup, "getList")();
  const names = items.map((item) => item.name);
  const staticParams = names.slice(0, limitStaticParams);

  const createTitle = (input) => {
    const title = titleCase(input);

    return `${title} (${titleCase(apiGroup)})`;
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

        const [nextName, previousName] = [cycled.peek(1), cycled.peek(-1)];

        return (
          <>
            <link rel="icon" href={getFavicon({ context })} />
            <Avatar
              style={{
                alignSelf: "center",
                position: "fixed",
              }}
              src={getAvatar({ context })}
            />
            <Layout
              renderTitle={() => (
                <span>
                  {titleCase(name)}
                  <span
                    style={{
                      color: "var(--color-fd-muted-foreground)",
                    }}
                  >
                    {" ("}
                    {titleCase(apiGroup)}
                    {")"}
                  </span>
                </span>
              )}
              top={5}
              title={context.title}
              descriptions={[
                [
                  "index",
                  <span>
                    {context.index + 1}
                    {" / "}
                    {items.length}
                  </span>,
                ],
                [
                  "next",
                  <Link href={`/${apiGroup}/${nextName}`}>
                    {titleCase(nextName)}
                  </Link>,
                ],
                [
                  "previous",
                  <Link href={`/${apiGroup}/${previousName}`}>
                    {titleCase(previousName)}
                  </Link>,
                ],
                [
                  "links",
                  <>
                    <Link href={`/${apiGroup}`}>List Page</Link>
                    {" & "}
                    <Link href={resourceUrl}>API</Link>
                  </>,
                ],
              ]}
            >
              {staticParams.includes(name) || (
                <Callout
                  type="warn"
                  title={`Static limit exceeded (${limitStaticParams})`}
                >
                  This page wasn’t pre-built because it’s outside the static
                  generation limit. Data changes may cause inconsistent results.
                </Callout>
              )}
              {await render({ context })}
              <div style={{ height: "1rem" }} />
            </Layout>
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
