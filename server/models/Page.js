const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Creates blueprint of a document (like a row in an SQL table)
// Multiple docs are associated in collections
const pageSchema = new Schema({
  title: { type: String, required: true },
  urlTitle: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['open', 'closed'] },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

// Represents a collection (Same as an SQL table)
const Page = model('Page', pageSchema);

module.exports = Page;
