import userModel from '../models/userModel';
import db from '../db';

export default class userObjects {
  static async getUserNo(req) {
    const values = [
      req.body.mobileno,
    ];
    const user = await db.query(userModel.getUserByNo, values);
    return user;
  }

  static async currentUser(req, res, next) {
    try {
      const user = await db.query(userModel.currentUser, [req.body.email]);
      if (!user.rows.length) { return next(); }
      return res.status(409).json({ status: 409, message: 'The user with this email has already registered' });
    } catch (error) {
      return next(error);
    }
  }

  static newUser(hash, req) {
    const values = [
      req.body.email,
      req.body.mobileno,
      req.body.firstName,
      req.body.lastName,
      hash,
      req.body.address,
    ];
    return values;
  }
}
