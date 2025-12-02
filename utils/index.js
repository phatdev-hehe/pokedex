export const uniqBy = (array = [], getValue) => {
  const set = new Set();

  return array.filter((item) => {
    const value = getValue(item);

    if (set.has(value)) return;

    set.add(value);

    return true;
  });
};

export const randomItem =
  // https://1loc.completejavascript.com/snippets/random/get-a-random-item-from-an-array
  (arr) => arr[(Math.random() * arr.length) | 0];

export const chunk =
  // https://1loc.completejavascript.com/snippets/array/split-an-array-into-chunks
  (arr, size) =>
    arr.reduce(
      (acc, e, i) => (
        i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc
      ),
      []
    );

export const noop = () => {};

export const getOpengraphUrl = (object) => {
  const url = new URL("https://nextjs.org/api/docs-og");

  for (const [name, value] of Object.entries(object))
    url.searchParams.set(name, value);

  return url.toString();
};
