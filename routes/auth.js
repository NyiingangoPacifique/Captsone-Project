const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation} = require('../validation')

router.post('/Register', async(req,res)=>{
    //lets validate before
    const {error} = registerValidation(req.body)
   if(error)return res.status(400).send(error.details[0].message)

   //check email if exist
   const emailExist = await User.findOne({ email: req.body.email })
   if (emailExist) return res.status(400).send('Email already exists')

   //hash password

   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        isadmin: req.body.isadmin
    })
    try {
        const savedUser = await user.save()
        //show all
        res.send(savedUser)
        //show only id
        //res.send({user: user._id})
        //res.send({user: user._name})
        //res.send({user: user._email})
    } catch (error) {
        res.status(400).send(error)
    }
})

//login

router.post('/login', async(req,res) => {
    //validate
    /*const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email is not found')
    //password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    
    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res
    .header('auth-token', token)
    .send(token)

    //res.send('Logged in!');*/
    //const user = await User.findOne({ email: req.body.email })
    const {error} = loginValidation(req.body)
   if(error)return res.status(400).send(error.details[0].message)


    const userFound = await User.findOne({ email: req.body.email });
  if (userFound) {
    const validPass = await bcrypt.compare(req.body.password, userFound.password)
    if (validPass) {
      const data = {
        email: userFound.email,
        isadmin: userFound.isadmin
      };
      const token = jwt.sign({_id: userFound._id}, process.env.TOKEN_SECRET)
      //const token = jwt.sign(data, 'basha', { expiresIn: '1h' });
      return res.status(200).json({
        status: 200,
        message: 'User signed in successfully',
        data: userFound,
        token: token,
      });
    } else {
      return res.status(401).json({
        status: 401,
        error: 'Incorrect email/password2',
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      error: 'Incorrect email/password1',
    });
  }

})
module.exports=router