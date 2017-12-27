const mongoose = require('mongoose');
const Page = require('./Page');
const User = require('./User');

mongoose.connect('mongodb://localhost/wikistack');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error.'));

module.exports = {
  Page,
  User,
};
