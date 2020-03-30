module.exports = {
  roots: [`src`, `test`],
  // transform: {
  //   "^.+\\.ts$": "ts-jest",
  // },
  testRegex: "(/test/.*.(test|spec)).(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coveragePathIgnorePatterns: ["(test/.*.mock).(jsx?|tsx?)$"],
  verbose: true,
};
