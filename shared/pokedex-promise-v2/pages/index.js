import { DescriptionList, Link, table, tabs } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { chunk, titleCase } from "@/shared/utils";
import { getLanguageName } from "@/shared/utils/get-language-name";
import Cycled from "cycled";
import { Callout } from "fumadocs-ui/components/callout";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import Layout from "./layout";

const Avatar = ({ style, ...props }) => (
  <img alt=" " style={{ maxWidth: 100, ...style }} {...props} />
);

export default {
  createCollectionPage: async (apiType, chunkSize = 100) => {
    const names = (await Pokedex.api(apiType, "getList")()).results.map(
      (item) => item.name
    );

    const title = `${titleCase(`list of ${apiType}`)}(s)`;
    const chunks = chunk(names, chunkSize);

    return Object.assign(
      () => (
        <Layout title={title}>
          <Files>
            <Folder
              defaultOpen
              name={`${names.length} items, ${chunks.length} groups`}
            >
              {chunks.map((names, index1) => (
                <Folder
                  key={index1}
                  defaultOpen={!index1}
                  name={
                    <span>
                      {index1 * chunkSize + 1}
                      <span
                        style={{
                          color: "var(--color-fd-muted-foreground)",
                        }}
                      >
                        {" - "}
                        {index1 * chunkSize + names.length}
                      </span>
                    </span>
                  }
                >
                  {names.map((name, index2) => (
                    <File
                      key={index2}
                      icon={
                        <span
                          key={index2} // ??
                          style={{
                            color: "var(--color-fd-muted-foreground)",
                          }}
                        >
                          {index1 * chunkSize + index2 + 1}
                        </span>
                      }
                      name={
                        <Link href={`/${apiType}/${name}`}>
                          {titleCase(name)}
                        </Link>
                      }
                    />
                  ))}
                </Folder>
              ))}
            </Folder>
          </Files>
        </Layout>
      ),
      {
        generateMetadata: () => ({ title }),
      }
    );
  },
  createDetailPage: async (
    apiType,
    { getAvatar = () => {}, generateStaticParams = true } = {}
  ) => {
    const names = (await Pokedex.api(apiType, "getList")()).results.map(
      (item) => item.name
    );

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

          const [nextItem, previousItem] = [cycled.peek(1), cycled.peek(-1)];

          return (
            <>
              <Avatar
                style={{
                  alignSelf: "center",
                  position: "fixed",
                }}
                src={getAvatar({ context })}
              />
              <Layout
                nextHref={`/${apiType}/${nextItem}`}
                previousHref={`/${apiType}/${previousItem}`}
                nextTitle={nextItem}
                previousTitle={previousItem}
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
                {generateStaticParams || (
                  <Callout type="warn" title="generateStaticParams">
                    This page isn’t pre-built. If the data changes, the page
                    might not display correctly.
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
          (...data) =>
            tabs(
              data.map(([item]) => item),
              data.map(([, description, content], key) => (
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
          }
        ),
        generateStaticParams:
          generateStaticParams && (() => names.map((name) => ({ name }))),
        generateMetadata: async ({ params }) => {
          const { name } = await params;

          return {
            title: createTitle(name),
          };
        },
      }
    );
  },
};
