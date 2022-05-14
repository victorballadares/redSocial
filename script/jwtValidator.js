//midleware para autenticación de jwt
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log(req.cookies);  
  const token = req.cookies['x-access-token'];
    

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