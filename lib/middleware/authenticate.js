const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    const payload = jwt.verify(cookie, process.env.JWT_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    error.status = 401;
    error.message = 'You must be signed in!';
    next(error);
  }
};
