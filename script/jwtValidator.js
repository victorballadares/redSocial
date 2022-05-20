//midleware para autenticación de jwt
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => { 
  const user = JSON.parse(req.cookies['user_info']);
  const token = user['x-access-token'];
    

  if (!token) {
    res.redirect('/');
  }
  try {
    const decoded = jwt.verify(token, 'estoessecreto');
    req.user = decoded;
  } catch (err) {
    res.redirect('/');
  }
  return next();
};

module.exports = verifyToken;