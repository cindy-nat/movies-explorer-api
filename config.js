require('dotenv').config();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/movies-explorer',
  JWT_SECRET = 'some-secret-key',
} = process.env;

const CORS_OPTIONS = {
  origin: ['http://localhost:3001',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'Authorization',
  ],
  credentials: true,
};

module.exports = {
  PORT,
  MONGO_URL,
  JWT_SECRET,
  CORS_OPTIONS,
};
