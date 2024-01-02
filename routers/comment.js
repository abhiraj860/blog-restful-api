const {Router} = require('express');
const router = Router();
const userMiddleware = require('../middleware/users');
const {User, Blog, Comment} = require('../db/models');

// Create Comment
router.post('/', userMiddleware, async (req, res)=>{
    const username = req.username;
    const findAuthor = await User.findOne({username});
    const commentor = findAuthor._id;

    const text = req.body.text;
    const blogPost = req.body.blogPost;
    
    const comment = await Comment.create({
        commentor,
        text,
        blogPost
    });
    res.status(200).json({
        comment
    });
});

// Get comments
router.get('/:id', userMiddleware, async (req, res)=>{
    const _id = req.params.id;
    try {
        const getComment = await Comment.findOne({_id});
        const user = getComment.commentor;
        const blogPost = getComment.blogPost;
        const getUser = await User.findOne({_id: user});
        const getBlog = await Blog.findOne({_id: blogPost});
        res.status(200).json({
            getComment,
            getUser,
            getBlog
        });
    } catch(error) {
        res.send(404).json({
            msg: "No such comments found"
        });
    }
});


router.delete('/:id', async (req, res)=>{
    const _id = req.params.id;
    try{
        const find = await Comment.findByIdAndDelete(_id);
        if(find === null) {
            return res.status(500).json({
                msg: 'Comment already deleted'
            });
        }
        res.status(200).json({
            msg: "Your comment is successfully deleted"
        });
    } catch(error) {
        res.status(403).json({
            msg: "Incorrect comment id"
        });
    }
});


module.exports = router;
