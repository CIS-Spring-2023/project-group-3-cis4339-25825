const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { users } = require('../models/models'); // import users model here
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// POST /users/login - login function
router.post('/login', async (req, res, next) => {
  try {
    const { username, password} = req.body;
    const user = await users.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.hashedPassword); 
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    else {
      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
});

// POST /users - create a new user
router.post('/', async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new users({ username, hashedPassword, role });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});

// GET /users - retrieve all users
router.get('/', async (req, res, next) => {
  try {
    const userList = await users.find();
    res.send(userList);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
