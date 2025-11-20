const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

export const getLanguageName = (code) => {
  if (typeof code === "string" && code.length >= 2)
    try {
      return languageNames.of(code);
    } catch {
      return code;
    }
};
