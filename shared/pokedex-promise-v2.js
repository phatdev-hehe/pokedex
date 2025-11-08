import { DescriptionList, table, tabs } from "@/shared/components";
import { capitalCase, split } from "change-case";
import deromanize from "deromanize";
import { notFound } from "next/navigation";
import PokeAPI from "pokedex-promise-v2";
import { Fragment } from "react";
import "server-only";

const sections = Object.assign(
  (...sections) =>
    tabs(
      sections.map(([item]) => item),
      sections.map(([, description, content], key) => (
        <Fragment key={key}>
          {description && <DescriptionList>{description}</DescriptionList>}
          {content}
        </Fragment>
      ))
    ),
  {
    names: (names, description) => [
      "Names",
      description,
      table(
        [undefined, "Language"],
        names.map(({ language, name }) => [name, language.name])
      ),
    ],
  }
);

export const Pokedex = Object.assign(new PokeAPI(), {
  formatName: (input) =>
    split(capitalCase(input))
      .map((word) =>
        Number.isNaN(deromanize(word)) ? word : word.toUpperCase()
      )
      .join(" "),
  Image: ({ style, ...props }) => (
    <img alt=" " style={{ maxWidth: 100, ...style }} {...props} />
  ),
  createPage: async ({
    getList,
    getData,
    titleSuffix,
    getAvatar = () => {},
  }) => {
    const names = (await Pokedex[getList]()).results.map(({ name }) => name);

    const createTitle = (title) => {
      title = Pokedex.formatName(title);

      return titleSuffix ? `${title} (${titleSuffix})` : title;
    };

    return {
      sections,
      generateStaticParams: () => names.map((name) => ({ name })),
      generateMetadata: async ({ params }) => {
        const { name } = await params;

        return { title: createTitle(name) };
      },
      withData:
        (render) =>
        async ({ params }) => {
          const { name } = await params;

          if (!names.includes(name)) notFound();

          try {
            const context = { data: await Pokedex[getData](name) };

            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  padding: "2rem",
                }}
              >
                <Pokedex.Image
                  style={{
                    alignSelf: "center",
                    position: "fixed",
                  }}
                  src={getAvatar(context)}
                />
                <div
                  style={{
                    position: "relative",
                    top: "11rem",
                  }}
                >
                  <div
                    style={{
                      position: "sticky",
                      top: "1rem",
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <h1>{createTitle(name)}</h1>
                    <small>
                      {[
                        names.findIndex((value) => value === name) + 1,
                        names.length,
                      ].join(" / ")}
                    </small>
                  </div>
                  <div
                    style={{
                      backgroundColor: "var(--color-fd-background)",
                      position: "inherit",
                    }}
                  >
                    {await render(context)}
                  </div>
                </div>
              </div>
            );
          } catch {
            notFound();
          }
        },
    };
  },
});
