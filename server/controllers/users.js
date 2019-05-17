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
    const [{
      id, firstName, lastName, email, mobileno,
    }] = rows;
    const userToken = authtok.generateToken('');
    res.status(201).json({
      status: 201,
      data: {
        token: userToken, id, firstName, lastName, mobileno, email,
      },
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
  static userSignin(req, res) {
    const user = userObjects.getUser(req);
    const validPassword = authtok.comparePassword(user.password, req.body.password);
    if (!validPassword) return res.status(401).json({ status: 401, message: 'Your email or password is incorrect' });
    const {
      id, firstName, lastName, email, mobileno, isAdmin,
    } = user;
    const userToken = authtok.generateToken(id, isAdmin);
    return res.status(200).json({
      status: 200,
      data: {
        token: userToken,
        id,
        firstName,
        lastName,
        mobileno,
        email,
      },
    });
  }
}

export default userController;
