const _ = require("lodash/fp");
const { get: getEnv } = require("env-var");
const importCwd = require("import-cwd");

const packageJson = importCwd.silent("./package.json");
const spenceConfig = importCwd.silent("./spencerc") || {};
const packageName = _.get("name", packageJson);

const nodeEnv = getEnv("NODE_ENV").default("development").asString();
const debug = getEnv("DEBUG").default(["test", "development"].includes(nodeEnv).toString()).asBool();
const dbNamePrefix = getEnv("DB_NAME_PREFIX")
  .default(_.get("dbNamePrefix", spenceConfig) || _.last(packageName.split("/")))
  .asString();
const dbName = getEnv("DB_NAME")
  .default(nodeEnv !== "production" ? `${dbNamePrefix}_${nodeEnv}` : dbNamePrefix)
  .asString();
const connection = getEnv("DATABASE_URL")
  .default(`postgresql://postgres@localhost:5432/${_.snakeCase(dbName)}`)
  .asString();
const mongoConnection = getEnv("MONGO_URL")
  .default(`mongodb://localhost:27017/?connectTimeoutMS=10000&t.databases=${_.kebabCase(dbName)}`)
  .asString();
const source = getEnv("NODE_SOURCE").default("spence-node").asString();

const config = {
  nodeEnv,
  debug,
  dbName,
  dbNamePrefix,
  connection,
  mongoConnection,
  source,
};

module.exports = config;
