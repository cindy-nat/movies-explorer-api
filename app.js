const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGO_URL } = require('./config');

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
