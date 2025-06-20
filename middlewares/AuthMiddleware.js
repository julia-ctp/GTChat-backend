const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'chave_secreta_muito_segura';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Token não enviado' });

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
}

module.exports = authMiddleware;