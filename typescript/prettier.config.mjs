/**
 * @type {import("prettier").Config}
 */
export const config = {
  overrides: [
    {
      files: ["*.md"],
      options: {
        useTabs: false,
      },
    },
  ],
  printWidth: 100,
  singleQuote: true,
  trailingComma: "es5",
  useTabs: true,
};
