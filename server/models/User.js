const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

userSchema.statics.findOrCreate = function findOrCreate({ name, email }) {
  return this.find({ name, email })
    .exec()
    .then((foundUser) => {
      let user = foundUser;
      if (!user) {
        this.create({ name, email });
      }
      return user;
    });
};

module.exports = userSchema;
