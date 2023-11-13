/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    project: true,

    sourceType: "module",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "typescript-sort-keys", "sort-keys-fix", "react-refresh"],
  root: true,
  rules: {
    // "@typescript-eslint/member-ordering": ["error"],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-redundant-type-constituents": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    "max-len": ["error", { code: 120 }],
    quotes: ["error", "double"],
    "react/jsx-sort-props": [
      1,
      {
        callbacksLast: true,
        ignoreCase: true,
        multiline: "last",
        // noSortAlphabetically: false,
        reservedFirst: true,
        shorthandFirst: true,
      },
    ],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    semi: ["error", "always"],
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "sort-keys": ["error", "asc", { caseSensitive: true, minKeys: 2, natural: true }],
    "sort-keys-fix/sort-keys-fix": "warn",
    "typescript-sort-keys/interface": [
      "error",
      "asc",
      { caseSensitive: true, natural: false, requiredFirst: false },
    ],
    "typescript-sort-keys/string-enum": "error",
  },
};
