const express = require('express');
const verify = require('../middleware/verifyToken');
const Comment = require('../model/comment');
const Post = require('../model/Post');
const router = express.Router();

//add comments

router.post('/post/:id/comment', async (req, res) => {
   const id = req.params.id;
   const comment = new Comment({
   text: req.body.comment,
   post: id
})
  // save comment
await comment.save();
const postRelated = await Post.findById(id);
postRelated.comments.push(comment);
await postRelated.save(function(err) {
if(err) {console.log(err)}
        res.send({
            data:comment,
            status:'Ok',
            message:'comment added successfuly'
        });
})

})

router.get('/comment', async(req,res)=> {
  try {
      const comment = await Comment.find()
      res.json(comment)
  } catch (error) {
      res.send('Error' + error)
  }
})

module.exports = router;