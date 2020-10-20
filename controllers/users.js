const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (req, res) => {

  if (!req.body.password || req.body.password.length < 3)
    return res.status(400).json({ error: 'Password must be at least 3 characters long' });
  const passwordHash = await bcrypt.hash(req.body.password, 12);

  const user = new User({
    username: req.body.username,
    name: req.body.name,
    passwordHash: passwordHash
  });

  const savedUser = await user.save();
  return res.json(savedUser.toJSON());
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs');
  return res.json(users.map(user => user.toJSON()));
});

module.exports = usersRouter;