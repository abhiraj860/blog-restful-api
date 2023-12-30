const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const blogRouter = require('./routers/blog');

const port = 3000;

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/blogposts', blogRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
