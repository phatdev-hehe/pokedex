import { Link } from "@/components/link";

const names = new Intl.DisplayNames(["en"], {
  type: "language",
});

export default (language) => {
  let name;

  try {
    if ("name" in language) name = names.of(language.name);
  } catch {
    return;
  }

  return (
    <Link href={`/language/${language.name}`} title={language.name}>
      {name}
    </Link>
  );
};
