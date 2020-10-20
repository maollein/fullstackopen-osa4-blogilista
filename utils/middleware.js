const logger = require('./logger');
const jwt = require('jsonwebtoken');

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'Invalid token' });
  }

  next(error);
};

const loginTokenParser = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.id) {
      req.userId = decodedToken.id;
    }
    else {
      req.userId = null;
    }
  } else {
    req.userId = null;
  }
  next();
};

const loginCheck = (req, res, next) => {
  if (!req.userId) return res.status(401).json({ error: 'You need to log in for this action' });
  else next();
};

module.exports = {
  errorHandler,
  loginTokenParser,
  loginCheck
};