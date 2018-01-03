const mongoose = require('mongoose');
const pageSchema = require('./Page');
const userSchema = require('./User');

mongoose.connect('mongodb://localhost/wikistack');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error.'));

// Model represents a collection (Same as an SQL table)
const Page = mongoose.model('Page', pageSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Page, User };
