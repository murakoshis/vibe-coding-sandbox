/* eslint-disable no-magic-numbers */

import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import checkFile from "eslint-plugin-check-file";
import perfectionist from "eslint-plugin-perfectionist";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/node_modules",
      "**/.DS_Store",
      "dist",
      "build",
      "coverage",
      "tmp",
      "temp",
      "**/.env",
      "**/.env.*",
      "!**/.env.example",
      "**/pnpm-lock.yaml",
      "**/package-lock.json",
      "**/yarn.lock",
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.node, ...globals.browser },
      sourceType: "module",
    },
    plugins: {
      "check-file": checkFile,
      perfectionist,
    },
    rules: {
      ...perfectionist.configs["recommended-natural"].rules,

      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.test.{ts,js}": "CAMEL_CASE",
          "**/*.{ts,js,cjs,mjs}": "CAMEL_CASE",
        },
        { ignoreMiddleExtensions: true },
      ],
      "check-file/folder-naming-convention": [
        "error",
        { "src/**/": "KEBAB_CASE" },
      ],

      complexity: ["error", 10],
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "id-length": ["error", { exceptions: ["_"], min: 2 }],
      "max-depth": ["error", 2],
      "max-params": ["error", 3],
      "no-implicit-coercion": "error",
      "no-implied-eval": "error",
      "no-magic-numbers": [
        "error",
        { enforceConst: true, ignore: [0, 1], ignoreArrayIndexes: true },
      ],
      "no-new-func": "error",
      "no-underscore-dangle": ["error", { allow: ["__typename"] }],

      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            "type",
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "unknown",
          ],
          ignoreCase: true,
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-keys": "off",
      "perfectionist/sort-modules": "off",
      "perfectionist/sort-named-imports": [
        "error",
        { ignoreCase: true, order: "asc", type: "natural" },
      ],
      "perfectionist/sort-objects": [
        "error",
        { ignoreCase: true, order: "asc", type: "natural" },
      ],
      "perfectionist/sort-union-types": [
        "error",
        { groups: ["unknown", "nullish"], type: "natural" },
      ],
      "prefer-const": ["error", { destructuring: "all" }],
      "prefer-template": "error",

      "sort-imports": "off",
      "sort-keys": "off",
    },
  },

  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: new URL(".", import.meta.url),
      },
    },
    plugins: { "@typescript-eslint": tseslint.plugin },
  },

  ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
    ...cfg,
    files: ["**/*.{ts,tsx}"],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((cfg) => ({
    ...cfg,
    files: ["**/*.{ts,tsx}"],
  })),

  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowExpressions: true, allowHigherOrderFunctions: true },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowAny: false,
          allowNullableBoolean: false,
          allowNullableEnum: false,
          allowNullableNumber: false,
          allowNullableObject: false,
          allowNullableString: false,
          allowNumber: false,
          allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
          allowString: false,
        },
      ],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
    },
  },

  {
    files: ["**/*.test.ts", "**/__tests__/**/*.ts"],
    languageOptions: { globals: { ...globals.vitest } },
    rules: {
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "max-lines": "off",
      "max-lines-per-function": "off",
      "max-statements": "off",
      "no-magic-numbers": "off",
    },
  },

  prettier,
];
