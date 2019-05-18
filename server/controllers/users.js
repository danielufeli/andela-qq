import dotenv from 'dotenv';
import userModel from '../models/userModel';
import authtok from '../helpers/authtok';
import userObjects from '../middleware/userObjects';
import db from '../db/index';

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
    const { rows } = await db.query(userModel.createUser, values);
    // if (result1) {
    //   return res.status(409).json({
    //     error: 'error',
    //   });
    // }
    const [{
      id, firstname, lastname, email, mobileno,
    }] = [{ rows }];
    const result = {
      id, firstname, lastname, email, mobileno,
    };
    const userToken = authtok.generateToken(result);
    res.status(201).json({
      status: 201,
      message: 'Success',
      token: userToken,
    });
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
    const { rows } = await db.query(userModel.currentUser, [req.body.email]);
    if (!rows[0]) {
      return res.status(400).json({ error: 400, message: 'Your email or password is incorrect' });
    }
    if (!authtok.comparePassword(rows[0].password, req.body.password)) {
      return res.status(400).json({ message: 'Your email or password is incorrect' });
    }
    const result = rows[0];
    const {
      id, firstname, lastname, mobileno, email,
    } = result;
    const userToken = authtok.generateToken(rows[0].id, rows[0].isadmin);
    return res.status(200).json({
      status: 200,
      data: {
        token: userToken, id, firstname, lastname, mobileno, email,
      },
    });
  }
}

export default userController;
