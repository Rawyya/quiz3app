const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../server/config");
const mongoose = require("mongoose");

const nodemailer = require("nodemailer");

const User = require("../models/user");
const Quiz = require("../models/quiz");
const Result = require("../models/result");

router.post("/register", (req, res) => {
  let newUser = new User({
    email: req.body.email,
    password: req.body.password,

    role: req.body.type,
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "Failed to Create User" });
    } else {
      console.log(user);
      return res.json({ success: true, msg: "User Created" });
    }
  });
});

router.post("/checkEmaailExist", (req, res) => {
  const email = req.body.email;

  console.log(email);

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found!" });
    } else {
       let code  =Math.floor(Math.random()*90000) + 10000;
      mailOptions.to = email;
      mailOptions.text ="reset your password  "+code
      User.findByIdAndUpdate(user._id, { $set: {resetPasswordCode:code} }, (error, response) => {
        console.log(response);
        transporter.sendMail(mailOptions, function (error, info) {
          return res.json({ user,error });
        });
      })
 
    }
  });
});

router.post("/checkResetPasswordCode", (req, res) => {
    const email = req.body.email;
  
    console.log(req.body);
  
    User.getUserByEmail(email, (err, user) => {
        let code  =req.body.code;
      if (err) throw err;
      if (!user) {
        return res.json({ success: false, msg: "User not found!" });
      } else {
      
       if (code ==user.resetPasswordCode){
        return res.json({ success: true, msg: true});
       }else {
        return res.json({ success: false, msg: "wrong code!" });
       }
      
   
      }
    });
  });
//   User.updatePassword(User._id, { $set: {resetPasswordCode:code} }, (error, response) => {
//     console.log(response);
  
//   })


  router.post("/updatePassword", (req, res) => {
   let user ={}
      user._id= req.body._id
       user.password=req.body.pass1
  
    
User.hashPassword(user.password, (err, data) => {

  
    
console.log(data)
User.findByIdAndUpdate(user._id, { $set: {password:data} }, (error, response) => {
    console.log(response);
   
      return res.json({ response,error });
 
  })
})
  
    // User.updatePassword(user, (err, user) => {
    //   if (err) {
    //     res.json({ success: false, msg: "Failed to update password " });
    //   } else {
    //     console.log(user);
    //     return res.json({ success: true, msg: "Password Updated" });
    //   }
    // });
  });
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "piland1998@gmail.com",
    pass: "92707683",
  },
});

var mailOptions = {
  from: "piland1998@gmail.com",
  to: "myfriend@yahoo.com",
  subject: "reset password ",
  text: "reset your password ",
};

router.post("/authenticate", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const userData = {
    email: email,
    password: password,
  };
  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found!" });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: userData }, config.secret, {
          expiresIn: 3600, // 30 min
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: user,
        });
      } else {
        return res.json({ success: false, msg: "Wrong Password!" });
      }
    });
  });
});

router.post("/createQuiz", (req, res) => {
  let newQuiz = new Quiz(req.body);

  newQuiz.save((err, data) => {
    if (err) {
      res.json({ success: false, msg: "Failed to Create Quiz" });
    } else {
      console.log(data);
      return res.json({ success: true, msg: "Quiz Created" });
    }
  });
});

router.post("/userExist", (req, res) => {
  const email = req.body.email;
  console.log(email)
  User.getUserByEmail(email, (err, data) => {
    if (err) {
      res.json({ success: false, msg: "Failed to save result" });
    } else {
      console.log(data);
      return res.json({ success: true, msg: data});
    }
  });
});
router.post("/saveResults", (req, res) => {
  let result = new Result(req.body);

  result.save((err, data) => {
    if (err) {
      res.json({ success: false, msg: "Failed to save result" });
    } else {
      console.log(data);
      return res.json({ success: true, msg: "result saved  " });
    }
  });
});
router.put("/editQuiz", (req, res) => {
  console.log(req.body);
  let id = req.body._id;
  // req.body.delete('_id');
  //

  Quiz.findByIdAndUpdate(id, { $set: req.body }, (error, response) => {
    (err, data) => {
      if (err) {
        res.json({ success: false, msg: "Failed to update Quiz" });
      } else {
        console.log(data);
        return res.json({ success: true, msg: "Quiz updated" });
      }
    };
  });
});

router.get("/getQuiz", (req, res, next) => {
  Quiz.find({}, (error, response) => {
    if (error) {
      return res.json({ success: false, msg: { error } });
    } else {
      return res.json({ success: true, msg: response });
    }
  });
});

router.get("/getResults", (req, res, next) => {
  Result.find({}, (error, response) => {
    if (error) {
      return res.json({ success: false, msg: { error } });
    } else {
      return res.json({ success: true, msg: response });
    }
  });
});

router.delete("/deletQuiz/:id", (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  Quiz.findByIdAndDelete(id, (error, response) => {
    if (error) {
      return res.json({ success: false, msg: { error } });
    } else {
      return res.json({ success: true, msg: response });
    }
  });
});

module.exports = router;
