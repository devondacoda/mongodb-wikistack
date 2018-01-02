const mongoose = require('mongoose');
const pageSchema = require('./Page');
const userSchema = require('./User');

mongoose.connect('mongodb://localhost/wikistack');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error.'));

// Model represents a collection (Same as an SQL table)
const Page = mongoose.model('Page', pageSchema);
const User = mongoose.model('User', userSchema);
Page.findByTags = (tags) => {
  const tagsArr = tags.split(',').map(tag => tag.trim());
  return Page.find({
    // $in matches a set of possibilities
    tags: { $in: tagsArr },
  }).exec();
};

module.exports = { Page, User };
