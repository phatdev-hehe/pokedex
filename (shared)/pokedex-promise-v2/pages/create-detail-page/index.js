import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { noop, titleCase } from "@/(shared)/utils";
import Cycled from "cycled";
import { Callout } from "fumadocs-ui/components/callout";
import { notFound } from "next/navigation";
import Layout from "../layout";
import Avatar from "./avatar";
import tabs from "./tabs";

export default async (
  apiType,
  { getAvatar = noop, limitStaticParams = Infinity, getFavicon = noop } = {}
) => {
  const names = (await Pokedex.api(apiType, "getList")()).results.map(
    (item) => item.name
  );

  const staticNames = names.slice(0, limitStaticParams);

  const createTitle = (input) => {
    const title = titleCase(input);

    return apiType ? `${title} (${titleCase(apiType)})` : title;
  };

  return Object.assign(
    (render) => {
      const cycled = new Cycled(names);

      return async ({ params }) => {
        const { name } = await params;

        if (!names.includes(name)) notFound();

        const context = {
          index: names.findIndex((name1) => name1 === name),
          data: await Pokedex.api(apiType, "getByName")(name),
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
              renderTitle={() => {
                const [a, b] = context.title.split(" (");

                return (
                  <span>
                    {a}
                    <span
                      style={{
                        color: "var(--color-fd-muted-foreground)",
                      }}
                    >
                      {" ("}
                      {b}
                    </span>
                  </span>
                );
              }}
              nextHref={`/${apiType}/${nextName}`}
              previousHref={`/${apiType}/${previousName}`}
              nextTitle={nextName}
              previousTitle={previousName}
              top={5}
              title={context.title}
              description={
                <span>
                  {context.index + 1}
                  {" / "}
                  {names.length}
                </span>
              }
            >
              {staticNames.includes(name) || (
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
      generateStaticParams: () => staticNames.map((name) => ({ name })),
      generateMetadata: async ({ params }) => {
        const { name } = await params;

        return {
          title: createTitle(name),
        };
      },
    }
  );
};
