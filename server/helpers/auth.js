import jwt from 'jsonwebtoken';
import db from '../db';
import userModel from '../models/userModel';

const auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) { res.status(401).json({ status: 401, message: 'Your token is missing' }); }
    try {
      const decoded = await jwt.verify(token, process.env.jwtPrivateKey);
      const { rows } = await db.query(userModel.getUserById, [decoded.userid]);
      if (!rows[0]) { res.status(401).json({ status: 401, message: 'Your token is invalid' }); }
      req.user = {
        id: decoded.userid,
        isadmin: decoded.admin,
        email: decoded.uemail,
        firstname: decoded.fname,
        lastname: decoded.lname,
      };
      next();
    } catch (ex) {
      res.status(401).json({ status: 401, message: 'Your token is invalid' });
    }
  },
};

export default auth;
