const {Router} = require('express');
const router = Router();
const userMiddleware = require('../middleware/users');
const {User} = require('../db/models');
const {Blog} = require('../db/models');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const token = jwt.sign(username, process.env.JWT_SECRET);
    const find = await User.findOne({username});
    if(!find) {
        await User.create({
            username,
            email,
            password
        });
        res.status(200).json({
            msg: 'User successfully created',
            username,
            token
        });
    } else {
        res.status(404).json({
            msg: 'Username already present'
        });
    }
});

router.post('/login', );

module.exports = router;
