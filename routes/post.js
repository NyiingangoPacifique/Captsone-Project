const router = require('express').Router()
const verify =  require('../middleware/verifyToken')
const verifyAdmin =  require('../middleware/verifyAdmin')
const Post = require('../model/Post')
const User = require('../model/User')

router.get('/check', (req, res)=> {
    res.send(req.user)
})
router.post ('/', async(req,res)=> {
    const post = new Post({
        title:req.body.title,
        body: req.body.body,
        subject: req.body.subject,
        image: req.body.image
    })
    try {
        const a1 = await post.save()
        res.json(a1)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/', async(req,res)=> {
    try {
        const post = await Post.find()
        res.json(post)
    } catch (error) {
        res.send('Error' + error)
    }
})
router.get('/:id', async(req,res)=> {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)
    } catch (error) {
        res.send('Error' + error)
    }
})

router.patch('/:id', verify, async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      if (req.body.title) {
        post.title = req.body.title;
      }
      if (req.body.body) {
        post.body = req.body.body;
      }

      if (req.body.subject) {
        post.subject = req.body.subject;
      }
      if (req.body.image) {
        post.img = req.body.image;
      }
      post.date = new Date();
  
      await post.save();
      res.send(post, "post updated");
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      if (post) {
        await Post.deleteOne({ _id: req.params.id });
        //res.status(204).send("Post deleted");
        return res.status(200).json({
          status: 200,
          message: 'Post Deleted successfully'
        });
      } else {
        res.status(404);
        res.send({ error: "Post doesn't exist1!" });
      }
    } catch (error) {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  });

module.exports=router