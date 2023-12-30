const {Router} = require('express');
const router = Router();
const userMiddleware = require('../middleware/users');
const {User} = require('../db/models');
const {Blog} = require('../db/models');
const jwt = require('jsonwebtoken');


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
// router.post('/:blogid', userMiddleware, (req, res)=>{

// });

module.exports = router;
