const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'FuckThemAll';

//  ROUTE 1 : create a user using: POST"/api/auth/createuser" doesn't require login 
router.post('/createuser' , [
    // name must be at least 5 chars long
    body('name','ENTER A VALID NAME').isLength({ min: 3 }),
     // email field must be an email type
    body('email','ENTER VALID EMAIL').isEmail(),
    // password must be at least 5 chars long
    body('password','PASSWORD TOO SHORT').isLength({ min: 5 }),

],async(req , res) =>{
  let success = false;
      // if there are errors then return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // check wether the user with this email exists already
      try{
       let user = await User.findOne({email : req.body.email});
       if(user)
       {
        return res.status(400).json({error: "user with this email already exists"})
       }
       const salt = await bcrypt.genSalt(10);
       const secPass = await bcrypt.hash(req.body.password, salt);
       user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

      const data ={
        user : {
          id : user.id
        }
      }

      const authtoken = jwt.sign(data ,JWT_SECRET);
      success =true;
        res.json({success,authtoken});
      }
      catch(error)
      {
        console.error(error.message);
        res.status(500).send("internal Server error occured");
      }
})

// ROUTE 2 : user LOGIN using: POST"/api/auth/login"  require login 
router.post('/login' , [
  
   // email field must be an email type
  body('email','ENTER VALID EMAIL').isEmail(),

  // password must be at least 5 chars long
  body('password','PASSWORD CANNOT BE NULL ').exists(),

],async(req , res) =>{
  let success = false;
   // if there are errors then return bad request and errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   
   const {email , password} = req.body;

   try{
      let user = await User.findOne({email});
      
      if(!user)
      {
        
        return res.status(400).json('PLEASE TRY TO LOGIN WITH CORRECT CREDENTIALS');
      }

      const passwordcompare = await bcrypt.compare(password , user.password);
      if(!passwordcompare)
      {
        
        return res.status(400).json('PLEASE TRY TO LOGIN WITH CORRECT CREDENTIALS');
      }

      const data ={
        user : {
          id : user.id
        }
      }

      const authtoken = jwt.sign(data ,JWT_SECRET);
        success = true;
        res.json({success, authtoken});

   }
   catch(error)
   {
    console.error(error.message);
    res.status(500).send("internal Server error occured");
   }

})

// ROUTE 3 : GET LOGGED IN USER DETAILS using: POST"/api/auth/getuser"  require login 
router.post('/getuser' , fetchUser, async(req , res) =>{

  try{
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    
    if(!user)
    {
      return res.status(400).json('PLEASE TRY TO LOGIN WITH CORRECT CREDENTIALS');
    }
    
      res.send(user);

 }
 catch(error)
 {
  console.error(error.message);
  res.status(500).send("internal Server error occured");
 }

})


module.exports = router