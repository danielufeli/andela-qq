import User from '../models/user';
import userModel from '../models/userModel';
import db from '../db/index';

export default class userObjects {
  static singleUser(req) {
    const user = User.currentUser(req.params.useremail);
    return user;
  }

  static verifyUser(user, req) {
    const { status } = req.body;
    User.updateUserStatus(user, status);
    return user;
  }

  static async getUser(req) {
    const values = [
      req.body.email,
    ];
    const { rows } = await db.query(userModel.currentUser, values);
    return rows;
  }

  static async getUserNo(req) {
    const values = [
      req.body.mobileno,
    ];
    const user = await db.query(userModel.currentUser, values);
    return user;
  }

  static getUsersId(req) {
    const user = User.userById(req.user.id);
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
