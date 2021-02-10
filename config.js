require('dotenv').config();

const { NODE_ENV = 'development', PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/movies-explorer' } = process.env;

module.exports = {
  PORT,
  MONGO_URL,
  NODE_ENV,
};
