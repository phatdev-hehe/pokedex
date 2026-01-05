import { notFound } from "next/navigation";

import { Pokedex } from "@/lib/pokedex-promise-v2";

export const generateStaticParams = () =>
  Pokedex.api.routes.map((resource) => ({ resource }));

export default async ({ children, params }) => {
  if (Pokedex.api.routes.includes((await params).resource)) return children;
  else notFound();
};
