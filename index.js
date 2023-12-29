const express = require('express');
const app = express();
const userRouter = require( );

app.use(express.json());
app.use('/api', userRouter);
app.use