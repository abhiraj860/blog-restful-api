const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const blogRouter = require('./routers/blog');

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api', blogRouter);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
