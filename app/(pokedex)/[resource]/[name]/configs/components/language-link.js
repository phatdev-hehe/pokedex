import { Link } from "@/components/link";

const displayNames = new Intl.DisplayNames([process.env.NEXT_PUBLIC_LOCALE], {
  type: "language",
});

export default (language) => {
  let displayName;

  try {
    if ("name" in language) displayName = displayNames.of(language.name);
  } catch {
    return;
  }

  return (
    <Link href={`/language/${language.name}`} title={language.name}>
      {displayName}
    </Link>
  );
};
