const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const blogRouter = require('./routers/blog');
const commentRouter = require('./routers/comment');

const port = 3000;

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/blogposts', blogRouter);
app.use('/api/comments', commentRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
