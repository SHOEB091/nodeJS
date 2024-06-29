const jwt = require('jsonwebtoken');

const secret = "Shoeb$123@$" ;

//this function makes token 
function setUser(user) {
  //here we provide a Playload to this 
  return jwt.sign({
    _id: user._id,
    email:user.email,
    role:user.role,
  },secret)//here we passed out secret key 
}

function getUser(token) {
  if(!token) return null;
  return jwt.verify(token, secret);
}

module.exports = {
  setUser,
  getUser,
};
