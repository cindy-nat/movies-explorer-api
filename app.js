require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, MONGO_URL } = process.env;
const app = express();
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(PORT);
});
