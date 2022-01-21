const express = require('express');
const verify = require('../middleware/verifyToken');
const Comment = require('../model/comment');
const Post = require('../model/Post');
const router = express.Router();

//add comments

router.post ('/comment', verify, async(req,res)=> {
    const comment = new Comment({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        post_id:req.body.postId,
      });

      const postFound=await Post.findOne({_id:req.body.postId});
      if(!postFound){
        res.status(404).send({ message:'comment are related with a post'}) 
      }else{
        await comment.save();
        res.send({
            data:comment,
            status:'Ok',
            message:'comment added successfuly'
        });
      } 
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