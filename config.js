require('dotenv').config();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/movies-explorer',
  JWT_SECRET = 'some-secret-key',
} = process.env;

module.exports = {
  PORT,
  MONGO_URL,
  JWT_SECRET,
};
