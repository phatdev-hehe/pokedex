import { notFound } from "next/navigation";

import { Pokedex } from "@/lib/pokedex-promise-v2";

// export const dynamicParams = false;

export const generateStaticParams = () =>
  Pokedex.api.routeNames.map((resource) => ({ resource }));

export default async ({ children, params }) => {
  if (Pokedex.api.routeNames.includes((await params).resource)) return children;
  else notFound();
};
