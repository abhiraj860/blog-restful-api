const {Router} = require('express');
const router = Router();
const userMiddleware = require('../middleware/users');
const {User} = require('../db/models');
const {Blog} = require('../db/models');
const jwt = require('jsonwebtoken');
const secret = require('../jwt/jwt');

router.post('/register', async (req, res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const token = jwt.sign(username, secret);
    const find = await User.findOne({username});
    if(!find) {
        const create = await User.create({
            username,
            email,
            password
        });
        res.status(200).json({
            token,
            create
        });
    } else {
        res.status(404).json({
            msg: 'Username already present'
        });
    }
});

router.post('/login', async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const find = await User.findOne({
        email,
        password
    });
    if(find) {
        const username = find.username;
        const token = jwt.sign({
            username
        }, secret);
        res.status(200). json({
            token,
            user: find
        }); 
    } else {
        res.status(404).json({
            msg: "Wrong Credentials"
        });
    }
});

module.exports = router;
