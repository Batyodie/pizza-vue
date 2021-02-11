// prettier-ignore
// active options from jest unit test framework
module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  modulePaths: ["<rootDir>"],
  transform: {
    ".*.(vue)$": "<rootDir>/node_modules/vue-jest",
    "^.+.js$": "<rootDir>/node_modules/babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
};
