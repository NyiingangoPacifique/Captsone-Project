/*const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    title: {
        type:String,
        required:true
    },
    body: {
        type: String,
        required:true
    },
    subject: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post',postSchema)
*/
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    body: {
        type: String,
        required:true
    },
    subject: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
   date: {
     type: Date,
     default: Date.now
    },
 // a blog post can have multiple comments, so it should be in a array.
 // all comments info should be kept in this array of this blog post.
  comments: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Comment'
   }]
   })

   postSchema.virtual('url').get(function(){
      return '/post/' + this._id
   })

 module.exports = mongoose.model('Post', postSchema);