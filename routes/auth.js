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
        //res.send(savedUser)
        //show only id
        //res.send({user: user._id})
        //res.send({user: user.name})
        //res.send({user: user._email})
        res.status(200).send({
          status: "ok",
          message: "User successfully created",
          email: user.email
        });
    } catch (error) {
        res.status(400).send(error)
    }
})

//login

router.post('/login', async(req,res) => {
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
      
    }
  } else {
    return res.status(401).json({
      status: 401,
      error: 'Incorrect email/password1',
    });
  }

})

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, "YOUR_SECRET_KEY");
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};


router.get("/login1", (req, res) => {
  const token = jwt.sign({ id: 7, role: "captain" }, "YOUR_SECRET_KEY");
  return res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌" });
});

router.get("/logout1", authorization, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});
router.get('/logout', async(req,res) => {
  req.logout();
  res.redirect('/');
});
module.exports=router