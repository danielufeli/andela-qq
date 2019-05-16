import dotenv from 'dotenv';
import User from '../models/user';
import authtok from '../helpers/authtok';
import userObjects from '../middleware/userObjects';

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
  static userSignup(req, res) {
    const hash = authtok.hashPassword(req.body.password);
    const user = new User(
      req.body.email,
      req.body.mobileno,
      req.body.firstName,
      req.body.lastName,
      hash,
      req.body.address,
    );
    user.save();
    const {
      id, firstName, lastName, email, mobileno,
    } = user;
    const userToken = authtok.generateToken('');
    return res.status(201).json({
      status: 201,
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
