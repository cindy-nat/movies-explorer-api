const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');

const { PORT, MONGO_URL } = require('./config');

const app = express();
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);

app.listen(PORT, () => {
  console.log(PORT);
});
