const mongoose = require('mongoose');

const { Schema } = mongoose;

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

pageSchema.virtual('route').get(() =>
  `wiki/${this.urlTitle}`);

pageSchema.pre('validate', function urlify(next) {
  this.urlTitle = this.title
    ? this.title.replace(/\s+/g, '_').replace(/\W/g, '')
    : Math.random().toString(36).substring(2, 7);

  next();
});


module.exports = pageSchema;
