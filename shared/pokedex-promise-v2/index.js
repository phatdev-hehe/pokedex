import { DescriptionList, table, tabs } from "@/shared/components";
import { chunk, titleCase } from "@/shared/utils";
import { getLanguageName } from "@/shared/utils/get-language-name";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import api from "./api";

const Page = ({ top = 0, title, description, children }) => {
  const date = new Date();

  return (
    <>
      <meta property="og:type" content="article" />
      <meta property="article:modified_time" content={date.toISOString()} />
      <meta property="og:title" content={title} />
      <meta
        property="og:image"
        content={`https://nextjs.org/api/docs-og?title=${title}`}
      />
      <div
        style={{
          "--sticky-offset": "1rem",
          "--letter-spacing": "-.09ch",

          position: "relative",
          top: `${top}rem`,
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "var(--sticky-offset)",
          }}
        >
          <DocsTitle style={{ letterSpacing: "var(--letter-spacing)" }}>
            {title}
          </DocsTitle>
          <DocsDescription
            style={{
              letterSpacing: "var(--letter-spacing)",
              display: "flex",
              flexDirection: "column",
              fontSize: "medium",
            }}
          >
            {description}
            <span>
              Last updated on{" "}
              <time
                style={{ color: "var(--color-fd-foreground)" }}
                dateTime={date.toISOString()}
              >
                {date.toLocaleDateString()}
              </time>
            </span>
          </DocsDescription>
        </div>
        <DocsBody>{children}</DocsBody>
      </div>
    </>
  );
};

export const Pokedex = {
  api,
  Image: ({ style, ...props }) => (
    <img alt=" " style={{ maxWidth: 100, ...style }} {...props} />
  ),
  createCollectionPage: async ({ path, getList, chunkSize = 100 }) => {
    const names = (await Pokedex.api[getList]()).results.map(
      ({ name }) => name
    );

    const title = `${titleCase(`list of ${path}`)}(s)`;
    const chunks = chunk(names, chunkSize);

    return Object.assign(
      () => (
        <Page title={title}>
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
                        <Link href={`/${path}/${name}`}>{titleCase(name)}</Link>
                      }
                    />
                  ))}
                </Folder>
              ))}
            </Folder>
          </Files>
        </Page>
      ),
      {
        generateMetadata: () => ({ title }),
      }
    );
  },
  createDetailPage: async ({
    getList,
    getData,
    path,
    getAvatar = () => {},
  }) => {
    const names = (await Pokedex.api[getList]()).results.map(
      ({ name }) => name
    );

    const createTitle = (input) => {
      const title = titleCase(input);

      return path ? `${title} (${titleCase(path)})` : title;
    };

    return {
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
                flavorText.flavor_text,
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
              <Pokedex.Image src={src} />
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
      Root: Fragment,
      generateStaticParams: () => names.map((name) => ({ name })),
      generateMetadata: async ({ params }) => {
        const { name } = await params;

        return { title: createTitle(name) };
      },
      withContext:
        (render) =>
        async ({ params }) => {
          const { name } = await params;

          if (!names.includes(name)) notFound();

          const context = {
            data: await Pokedex.api[getData](name),
            names,
            title: createTitle(name),
          };

          return (
            <>
              <Pokedex.Image
                style={{
                  alignSelf: "center",
                  position: "fixed",
                }}
                src={getAvatar(context)}
              />
              <Page
                top={5}
                title={context.title}
                description={
                  <span>
                    {names.findIndex((value) => value === name) + 1}
                    {" / "}
                    {names.length}
                  </span>
                }
              >
                {await render(context)}
                <div style={{ height: "1rem" }} />
              </Page>
            </>
          );
        },
    };
  },
};
