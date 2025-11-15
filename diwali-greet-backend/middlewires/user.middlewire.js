const jwt = require('jsonwebtoken');

const isLoggedIn = async(req, res, next) =>{
  const { token } = req.cookies;
  if(!token){
    res.json({ Message: "unauthorized to do it!"});
    return;
  }
  const decoded = await jwt.verify(token, "suraj@123");
  if(!decoded){
    res.status(401).json({ Message: "Unauthorized to do it!" });
    return;
  }
  next();
}

module.exports = { isLoggedIn };