import { Link } from "@/components";

const names = new Intl.DisplayNames(["en"], { type: "language" });

export default ({ language }) => {
  try {
    return (
      <Link href={`/language/${language.name}`} title={language.name}>
        {names.of(language.name)}
      </Link>
    );
  } catch {}
};
