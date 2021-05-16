const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../server/config');
const mongoose = require("mongoose");

const User = require('../models/user');
const Quiz = require('../models/quiz');
const Result = require('../models/result');

router.post('/register', (req, res) => {

    let newUser = new User({

        email: req.body.email,
        password: req.body.password,

        role: req.body.type
    });


    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to Create User' });
        } else {
            console.log(user);
            return res.json({ success: true, msg: 'User Created' });
        }
    });

});

router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const userData = {
        email: email,
        password: password
    }
    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found!' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: userData }, config.secret, {
                    expiresIn: 3600 // 30 min
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: user
                });
            } else {
                return res.json({ success: false, msg: 'Wrong Password!' });
            }
        });
    });
});


router.post('/createQuiz', (req, res) => {

    let newQuiz = new Quiz(req.body);

    newQuiz.save((err,data)=> {
        if (err) {
            res.json({ success: false, msg: 'Failed to Create Quiz' });
        } else {
            console.log(data);
            return res.json({ success: true, msg: 'Quiz Created' });
        }
    });

});

router.post('/saveResults', (req, res) => {

    let result = new Result(req.body);

    result.save((err,data)=> {
        if (err) {
            res.json({ success: false, msg: 'Failed to save result' });
        } else {
            console.log(data);
            return res.json({ success: true, msg: 'result saved  '});
        }
    });

});
router.put('/editQuiz', (req, res) => {
  console.log(req.body)
let id =req.body._id
// req.body.delete('_id');
//

   Quiz.findByIdAndUpdate(id,{$set:req.body},(error, response) => {
    ((err,data)=> {
      if (err) {
          res.json({ success: false, msg: 'Failed to update Quiz' });
      } else {
          console.log(data);
          return res.json({ success: true, msg: 'Quiz updated' });
      }
  });

});})

router.get('/getQuiz',  (req, res, next) => {
    Quiz.find({}, (error, response) => {
        if (error) {
            return res.json({ success: false, msg: { error } });
        } else {
            return res.json({ success: true, msg: response });
        }
    });
});

router.get('/getResults',  (req, res, next) => {
    Result.find({}, (error, response) => {
        if (error) {
            return res.json({ success: false, msg: { error } });
        } else {
            return res.json({ success: true, msg: response });
        }
    });
});

router.delete('/deletQuiz/:id',  (req, res, next) => {
  let id =req.params.id
  console.log(id)
  Quiz.findByIdAndDelete(id, (error, response) => {
      if (error) {
          return res.json({ success: false, msg: { error } });
      } else {
          return res.json({ success: true, msg: response });
      }
  });
});










module.exports = router;
