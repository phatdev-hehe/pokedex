import { Pokedex } from "@/lib/pokedex-promise-v2";

export const dynamicParams = false;

export const generateStaticParams = () =>
  Pokedex.api.routeNames.map((routeName) => ({ "route-name": routeName }));

export { Fragment as default } from "react";
