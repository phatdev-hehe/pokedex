export const getOpengraphUrl = (object) => {
  const url = new URL("https://nextjs.org/api/docs-og");

  for (const [name, value] of Object.entries(object))
    url.searchParams.set(name, value);

  return url.toString();
};
