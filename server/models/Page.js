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
  tags: Array,
});

pageSchema.virtual('route').get(function route() {
  return `/wiki/${this.urlTitle}`;
});

pageSchema.pre('validate', function urlify(next) {
  this.urlTitle = this.title
    ? this.title.replace(/\s+/g, '_').replace(/\W/g, '')
    : Math.random().toString(36).substring(2, 7);

  next();
});

pageSchema.pre('validate', function createTags(next) {
  this.tags = this.tags.length
    ? this.tags.join(',').split(',').map(tag => tag.trim())
    : [];

  next();
});

pageSchema.statics.findByTags = function findByTags(tags, urlTitle) {
  const tagsArr = Array.isArray(tags)
    ? tags
    : tags.split(',').map(tag => tag.trim());

  return this.find({ // 'this' refers to the model built with the pageSchema (Page)
    // $in matches a set of possibilities
    tags: { $in: tagsArr },
    urlTitle: { $ne: urlTitle },
  }).exec();
};

pageSchema.methods.findSimilar = function findSimilar() {
  const { tags, urlTitle } = this;
  return this.findByTags(tags, urlTitle);
};


module.exports = pageSchema;
