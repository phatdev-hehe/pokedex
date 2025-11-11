const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

export const getLanguageName = (code = "en") => languageNames.of(code);
