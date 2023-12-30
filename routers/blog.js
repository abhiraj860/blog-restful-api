const {Router} = require('express');
const router = Router();
const userMiddleware = require('../middleware/users');
const {User} = require('../db/models');
const {Blog} = require('../db/models');
const jwt = require('jsonwebtoken');

router.post('/', (req, res)=>{
    
});

router.post('/', async (req, res)=>{
    
});

module.exports = router;
