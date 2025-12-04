import { Link } from "@/components";

const names = new Intl.DisplayNames(["en"], { type: "language" });

export default ({ language }) => {
  try {
    return (
      <Link title={language.name} href={`/language/${language.name}`}>
        {names.of(language.name)}
      </Link>
    );
  } catch {}
};
