import { Link } from "@/components/link";

const names = new Intl.DisplayNames(["en"], { type: "language" });

export const languageLink = (language) => {
  try {
    return (
      <Link href={`/language/${language.name}`} title={language.name}>
        {names.of(language.name)}
      </Link>
    );
  } catch {}
};
