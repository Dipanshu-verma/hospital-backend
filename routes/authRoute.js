const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel.js');
 

const authrouter = express.Router();

authrouter.post('/signup', async (req, res) => {
  const { email, password, confirmpassword } = req.body;

  if (password !== confirmpassword) {
    return res.status(400).json({ error: 'Passwords do not match please try again' });
  }
  const olduser = await UserModel.findOne({ email });

  if (olduser) {
    return res.status(401).json({ error: 'User Already exist please login' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createUser = new UserModel({
    email,
    password: hashedPassword,
  });
  

  try {
    await createUser.save();
    res.status(201).json({ message: 'User registered  successfully ' });
  } catch (error) {
    res.status(500).json({ error: 'server error ' });
  }
});

authrouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const olduser = await UserModel.findOne({ email });

    if (!olduser) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const checkPassword = await bcrypt.compare(password, olduser.password);

    if (!checkPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: olduser._id }, process.env.JSON_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = authrouter;
