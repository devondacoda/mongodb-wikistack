const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', express.static(path.join(__dirname, '..', 'public')));

app.use('/', (err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error'));
