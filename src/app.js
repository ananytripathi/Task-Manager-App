const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json());


app.use(userRouter);
app.use(taskRouter);

// without middleware: new request -> run route handler.

//with middleware: new request -> do something -> run route handeler.

module.exports = app;