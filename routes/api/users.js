const express = require('express');
const { check, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../../config/database')

const { secret, expiresIn } = jwtConfig;

const { User } = require('../../db/models');

const router = express.Router();

const getUserToken = (user) => {
  const userDataForToken = {
    email: user.email,
  };

  // Create the token.
  const token = jwt.sign(
    { data: userDataForToken },
    secret,
    { expiresIn } // 604,800 seconds = 1 week
  );

  return token;
};

const email =
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail();

const username =
  check('username')
    .not().isEmpty()
    .withMessage('Please provide a username');

const password =
  check('password')
    .not().isEmpty()
    .withMessage('Please provide a password');

router.post('/', email, password, username, asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({ status: 422, errors: errors.array() });
    }
    const {email, password, username} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });

    const token = getUserToken(user);
    res.cookie("token", token);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
}));

router.get('/', asyncHandler(async function (req, res, next) {
    const users = await User.findAll();
    res.json({ users });
}));

module.exports = router;
