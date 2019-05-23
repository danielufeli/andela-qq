import userModel from '../models/userModel';
import db from '../db';

export default class userObjects {
  static async getUserNo(req) {
    const values = [
      req.body.mobileno,
    ];
    const user = await db.query(userModel.currentUser, values);
    return user;
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
