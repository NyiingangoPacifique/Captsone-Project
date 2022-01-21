const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comments')

dotenv.config()
//connection to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true},
    () => console.log('connected to db')
)

//middleware
app.use(express.json())

//Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute);

app.listen(3000, ()=>
  console.log('Server Up and runnin')
);