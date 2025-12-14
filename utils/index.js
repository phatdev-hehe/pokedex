import { encode } from "entities";

export const getOgUrl = (searchParams) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/api/og`);

  for (const [name, value] of Object.entries(searchParams))
    url.searchParams.set(name, value);

  return encode(url.toString());
};
