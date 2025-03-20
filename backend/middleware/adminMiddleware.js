// backend/middleware/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Você não é um administrador.' });
    }
    next();
  };
  
  module.exports = adminMiddleware;
  