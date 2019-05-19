import dotenv from 'dotenv';
import userModel from '../models/userModel';
import authtok from '../helpers/authtok';
import userObjects from '../middleware/userObjects';
import checkDuplicate from '../middleware/mailSignup';
import db from '../db';

dotenv.config();

/**
 *
 *
 * @class userController
 */
class userController {
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof userController
   */
  static async userSignup(req, res) {
    const hash = authtok.hashPassword(req.body.password);
    const values = userObjects.newUser(hash, req);
    try {
      const { rows } = await db.query(userModel.createUser, values);
      const {
        id, isadmin, firstname, lastname, email,
      } = rows[0];
      const userToken = authtok.generateToken(id, isadmin, email, firstname, lastname);
      res.status(201).json({
        status: 201,
        data: {
          token: userToken, id, firstname, lastname, email,
        },
      });
    } catch (ex) {
      checkDuplicate(ex, res);
    }
  }

  /**
 *
 *
 * @static
 * @param {*} req
 * @param {*} res
 * @returns
 * @memberof userController
 */
  static async userSignin(req, res) {
    try {
      const { rows } = await db.query(userModel.currentUser, [req.body.email]);
      const result = rows[0];
      if (!result) { res.status(401).json({ status: 401, message: 'Your email is incorrect' }); }
      if (!authtok.comparePassword(result.password, req.body.password)) { res.status(401).json({ status: 401, message: 'Your password is incorrect' }); }
      const {
        id, firstname, lastname, mobileno, email, isadmin,
      } = result;
      const userToken = authtok.generateToken(id, isadmin, email, firstname, lastname);
      return res.status(200).json({
        status: 200,
        data: {
          token: userToken, id, firstname, lastname, email, mobileno,
        },
      });
    } catch (ex) {
      return ex;
    }
  }
}

export default userController;
