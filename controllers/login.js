const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  const user = await User.findOne({ username: username });
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET);
    return res.json({ username: user.username, id: user._id, token: token });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});

module.exports = loginRouter;