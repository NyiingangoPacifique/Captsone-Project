const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comments')
const skillsRoute = require('./routes/skills')
const contactRoute = require('./routes/contact')
require("dotenv").config();

const PORT = process.env.PORT || process.env.LOCAL_PORT;

dotenv.config()
//connection to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true},
    () => console.log('connected to db')
)

//middleware
app.use(express.json())

app.get("/", (req, res) => {
  return res.send("WELCOME TO MY BRAND");
});

//Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute);
app.use('/api/skill', skillsRoute)
app.use('/api/contact', contactRoute)

app.listen(PORT, () => {
  console.log("connection started!!");
});