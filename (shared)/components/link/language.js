import Link from "fumadocs-core/link";

const names = new Intl.DisplayNames(["en"], { type: "language" });

export default ({ code }) => {
  try {
    return (
      <Link title={code} href={`/language/${code}`}>
        {names.of(code)}
      </Link>
    );
  } catch {
    return code;
  }
};
