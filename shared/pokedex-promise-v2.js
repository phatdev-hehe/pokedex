import { capitalCase } from "change-case";
import { notFound } from "next/navigation";
import PokeAPI from "pokedex-promise-v2";
import "server-only";

export const Pokedex = Object.assign(new PokeAPI(), {
  formatName: capitalCase,
  Image: ({ style, ...props }) => (
    <img alt=" " style={{ maxWidth: 100, ...style }} {...props} />
  ),
  createPage: async ({ getList, getData, titleSuffix }) => {
    const names = (await Pokedex[getList]()).results.map(({ name }) => name);

    const createTitle = (title) => {
      title = Pokedex.formatName(title);

      return titleSuffix ? `${title} (${titleSuffix})` : title;
    };

    return {
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
            const data = await Pokedex[getData](name);

            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <small
                  style={{
                    alignSelf: "end",
                    position: "fixed",
                  }}
                >
                  {[
                    names.findIndex((value) => value === name) + 1,
                    names.length,
                  ].join(" / ")}
                </small>
                <Pokedex.Image
                  style={{
                    alignSelf: "center",
                    position: "fixed",
                  }}
                  src={data.sprites?.default ?? data.sprites?.front_default}
                />
                <div
                  style={{
                    position: "relative",
                    top: "10rem",
                  }}
                >
                  <h1>{createTitle(name)}</h1>
                  <div
                    style={{ backgroundColor: "var(--color-fd-background)" }}
                  >
                    {await render({ data })}
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
