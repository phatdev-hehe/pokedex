import { DescriptionList, Link, table, tabs } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { noop, titleCase } from "@/(shared)/utils";
import { getLanguageName } from "@/(shared)/utils/get-language-name";
import Cycled from "cycled";
import { Callout } from "fumadocs-ui/components/callout";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import Layout from "./layout";

const Avatar = ({ style, ...props }) => (
  <img alt=" " style={{ maxWidth: 100, ...style }} {...props} />
);

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
      tabs: Object.assign(
        (...values) =>
          tabs(
            values.map(([item]) => item),
            values.map(([, description, content], key) => (
              <Fragment key={key}>
                {description && (
                  <DescriptionList>{description}</DescriptionList>
                )}
                {content}
              </Fragment>
            ))
          ),
        {
          gameIndices: (game_indices, description) => [
            "game_indices",
            description,
            table(
              [undefined, "generation", "version"],
              game_indices.map(({ game_index, version, generation }) => [
                game_index,

                // ??
                titleCase(generation?.name),
                titleCase(version?.name),
              ])
            ),
          ],
          effectChanges: (effect_changes, description) => [
            "effect_changes",
            description,
            table(
              ["version_group", "effect_entries"],
              effect_changes.map((effectChange) => [
                titleCase(effectChange.version_group.name),
                table(
                  [undefined, "language"],
                  effectChange.effect_entries.map((effect) => [
                    effect.effect,
                    getLanguageName(effect.language.name),
                  ])
                ),
              ])
            ),
          ],
          effectEntries: (effect_entries, description) => [
            "effect_entries",
            description,
            table(
              [undefined, "language"],
              effect_entries.map((verboseEffect) => [
                <div title={verboseEffect.effect}>
                  {verboseEffect.short_effect}
                </div>,
                getLanguageName(verboseEffect.language.name),
              ])
            ),
          ],
          flavorTextEntries: (flavor_text_entries, description) => [
            "flavor_text_entries",
            description,
            table(
              [undefined, "language", "version", "version_group"],
              flavor_text_entries.map((flavorText) => [
                flavorText.flavor_text ?? flavorText.text,
                getLanguageName(flavorText.language.name),

                // ??
                titleCase(flavorText.version?.name),
                titleCase(flavorText.version_group?.name),
              ])
            ),
          ],
          sprites: (sprites, description) => [
            "sprites",
            description,
            table.fromObject(undefined, sprites, titleCase, (src) => (
              <Avatar src={src} />
            )),
          ],
          names: (names, description) => [
            "names",
            description,
            table(
              [undefined, "language"],
              names.map((name) => [
                name.name,
                getLanguageName(name.language.name),
              ])
            ),
          ],
          types: (types, description) => [
            "types",
            description,
            table(
              [undefined, "slot"],
              types.map((type) => [
                <Link href={`/type/${type.type.name}`}>
                  {titleCase(type.type.name)}
                </Link>,
                type.slot,
              ])
            ),
          ],
        }
      ),
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
