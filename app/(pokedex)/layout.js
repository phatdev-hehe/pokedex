import logoSrc from "@/logo.gif";
import { Image } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

const createDocsLayoutTree = async ([getList, path]) => {
  const data = await Pokedex.api[getList]();

  return {
    name: `${data.count} ${path}`,
    type: "folder",
    children: data.results.map(({ name }) => ({
      name: Pokedex.formatName(name),
      url: `/${path}/${name}`,
    })),
  };
};

const DocsLayoutTree1 = await Promise.all(
  [["getPokemonsList", "pokemon"]].map(createDocsLayoutTree)
);

const DocsLayoutTree2 = await Promise.all(
  [
    ["getMovesList", "move"],
    ["getPokemonSpeciesList", "pokemon-species"],
    ["getStatsList", "stat"],
    ["getTypesList", "type"],
  ].map(createDocsLayoutTree)
);

export default ({ children }) => (
  <DocsLayout
    nav={{
      title: <Image width={50} src={logoSrc} />,
    }}
    githubUrl="https://github.com/phatdev-hehe/pokedex"
    tree={{
      children: [
        ...DocsLayoutTree1,
        { type: "separator", name: "More" },
        ...DocsLayoutTree2,
      ],
    }}
  >
    <div
      className="prose" // https://fumadocs.dev/docs/ui/theme#typography
      style={{ width: "100%" }}
    >
      {children}
    </div>
  </DocsLayout>
);
