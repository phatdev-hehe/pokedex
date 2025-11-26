const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

export const getLanguageName = (code) => {
  try {
    return languageNames.of(code);
  } catch {
    return code;
  }
};
