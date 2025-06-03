const jwt = require('jsonwebtoken');
const secretKey = 'my_secret_key';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; // presupozohet "Bearer TOKEN"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access token mungon." });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Access token i pavlefshëm ose ka skaduar." });
    }
    req.user = user; // ruan informacionin e përdoruesit për përdorim më tutje
    next();
  });
}

module.exports = authenticateToken;
