import { capitalCase } from "change-case";
import { notFound } from "next/navigation";
import PokeAPI from "pokedex-promise-v2";
import "server-only";

export const Pokedex = Object.assign(new PokeAPI(), {
  formatName: capitalCase,
  buildPage: async ({ getList, getData }) => {
    const names = (await Pokedex[getList]()).results.map(({ name }) => name);

    return {
      generateStaticParams: () => names.map((name) => ({ name })),
      generateMetadata: async ({ params }) => {
        const { name } = await params;

        return { title: Pokedex.formatName(name) };
      },
      withData:
        (children) =>
        async ({ params }) => {
          const { name } = await params;

          if (!names.includes(name)) notFound();

          try {
            const data = await Pokedex[getData](name);

            return (
              <>
                <img
                  style={{ maxWidth: 100 }}
                  src={data.sprites?.default ?? data.sprites?.front_default}
                />
                <h1>{Pokedex.formatName(data.name)}</h1>
                {children({ data })}
              </>
            );
          } catch {
            notFound();
          }
        },
    };
  },
});
