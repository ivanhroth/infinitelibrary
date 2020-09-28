const config = require('./');
const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

const jwtConfig = {
  secret: 'WP()*EJRP)W(*JERP:)(WJR)(J@P:#)(RJP:@#)(RJ@#(RJ',
  expiresIn: 604800,
};


module.exports = {
  jwtConfig,
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  test: {
    dialect: "sqlite",
    DB_CONN: "sqlite.memory",
    logging: false,
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
};
