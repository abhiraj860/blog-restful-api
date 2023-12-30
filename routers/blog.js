const {Router} = require('express');
const router = Router();
const userMiddleware = require('../middleware/users');
const {User} = require('../db/models');
const {Blog} = require('../db/models');
const jwt = require('jsonwebtoken');

// Create blog
router.post('/', userMiddleware, async (req, res)=>{
    const username = req.username;
    const find = await User.findOne({username});
    const title = req.body.title;
    const checkBlog = await Blog.findOne({title});
    if(checkBlog) {
        return res.status(403).json({
            msg: "Blog already published"
        });
    }
    const content = req.body.content;
    const tags = req.body.tags;
    const author = find._id;
    const blog = await Blog.create({
        title,
        content,
        tags,
        author
    });
    res.status(200).json({
        blog
    });
});

// Get all blogposts or by tags
router.get('/', userMiddleware, async (req, res)=>{
    const getTags = req.query.tags;
    if(getTags) {
        const find = await Blog.find({
            tags: {$in: [getTags]}
        });
        if(find.length === 0) return res.status(500).json({
            msg: "No such tags exits"
        });
        return res.status(200).json({
            blogs:find
        });
    }    
    const blogs = await Blog.find({});
    res.status(200).json({
        blogs
    });
});

// update the blogpost
router.put('/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        const change = req.body;
        let find = await Blog.findOneAndUpdate({_id: id}, 
            {$set: change},
            {new: true});
        res.status(200).json({
            find
        });
    } catch (error) {
        res.status(405).json({
            msg: "Such blog does not exist"
        });
    }
});

router.delete('/:id', async (req, res)=>{
    const _id = req.params.id;
    try{
        const find = await Blog.findByIdAndDelete(_id);
        if(find === null) {
            return res.status(500).json({
                msg: 'Blog already deleted'
            });
        }
        res.status(200).json({
            msg: "Your blog is successfully deleted"
        });
    } catch(error) {
        res.status(403).json({
            msg: "Incorrect blog id"
        });
    }
});


module.exports = router;
