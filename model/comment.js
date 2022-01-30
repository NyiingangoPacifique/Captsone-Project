/*const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  post_id:String
});

module.exports = mongoose.model("comment", schema);*/

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
 text: {
      type: String,
      trim: true,
      required: true
   },
date: {
      type: Date,
      default: Date.now
   },
// each comment can only relates to one blog, so it's not in array
post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
   }
 })

module.exports = mongoose.model('comment', commentSchema);
