import jwt from 'jsonwebtoken';
import getUserId from './getuserid';

const auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) {
      return res.status(401).send({ status: 401, message: 'Access denied. No token provided.' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.jwtPrivateKey);
      const user = getUserId(decoded.userid);
      if (!user) {
        return res.status(401).json({ status: 401, message: 'Your token is invalid' });
      }
      req.user = {
        id: decoded.userid,
        isAdmin: decoded.admin,
      };
      return next();
    } catch (ex) {
      return res.status(401).json({ status: 401, message: 'Your token is invalid' });
    }
  },
};

export default auth;
