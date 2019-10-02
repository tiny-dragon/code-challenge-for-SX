const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const auth = require('../middleware/auth');

// User Model
const User = require('../model/User');

// @route   POST api/user
// @desc    Register new user
// @access  Public
router.get('/', auth, async (req, res) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  try {
    const users = await User.find({is_admin: false}, { _id: 1, name: 1, email: 1, date: 1 })
      .sort({date: 'desc'})
      .skip(pagination * page - pagination)
      .limit(pagination);
    const count = await User.countDocuments({is_admin: false});

    let result = [];
    
    users.forEach((user, index) => {
      let temp = {
        _id : user['_id'],
        name : user['name'],
        email : user['email'],
        date : moment(user['date']).format('YYYY-MM-DD')
      }
      result.push(temp);
    });

    res.json({
      success: true,
      query: req.query,
      total: count,
      users: result,
      pages: Math.ceil(count / pagination)
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      err: message
    });
  }
});

router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.json({
      success: false,
      error: 'Please enter all fields'
    });
  }

  // Check for existing user
  User.findOne({ email }).then(async user => {
    if (user)
      return res.json({
        success: false,
        error: 'User already exists'
      });

    const count = await User.countDocuments({});

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'r',
      d: 'mm'
    });

    clearance = ['not_certified'];

    const newUser = new User({
      name,
      email,
      password,
      clearance,
      is_admin: count === 0 ? true : false,
      status: 'off',
      avatar
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign({ user: user }, process.env.SECRET_OR_KEY, (err, token) => {
            res.json({
              success: true,
              message: 'new user created',
              token,
              user
            });
          });
        });
      });
    });
  });
});

module.exports = router;
