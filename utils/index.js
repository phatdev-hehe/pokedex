import { encode } from "entities";

export const getOpengraphUrl = (object) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/api/og`);

  for (const [name, value] of Object.entries(object))
    url.searchParams.set(name, value);

  return encode(url.toString());
};
