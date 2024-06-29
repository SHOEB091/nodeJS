const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;

  req.user = null;

  if (!tokenCookie) {
    return next();
  }

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles) {
  return function(req, res, next) {
    if (!req.user) return res.redirect("/login"); // Fixed typo here from 'reditect' to 'redirect'

    if (!roles.includes(req.user.role)) { // Fixed typo here from 'icludes' to 'includes'
      return res.end("Unauthorized"); // Changed "UnAuthorized" to "Unauthorized" for consistency
    }
    return next();
  }
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};