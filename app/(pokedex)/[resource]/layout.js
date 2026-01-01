import { Pokedex } from "@/lib/pokedex-promise-v2";

// export const dynamicParams = false;

export const generateStaticParams = () =>
  Pokedex.api.routes.map((resource) => ({ resource }));

export { Fragment as default } from "react";
