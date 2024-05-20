const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
  {
    languageOptions: {
      parser: typescriptParser,
    },
  },
];
