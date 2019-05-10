import dotenv from 'dotenv';
import User from '../models/user';
import validateUser from '../helpers/validation/users';
import validateSignin from '../helpers/validation/signin';
import authtok from '../helpers/authtok';
import currentUser from '../helpers/currentUser';

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
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    let user = await currentUser(req.body.email);
    if (user) return res.status(401).json('User Already Registered.');
    const hash = authtok.hashPassword(req.body.password);
    user = new User(
      req.body.email,
      req.body.mobileno,
      req.body.firstName,
      req.body.lastName,
      hash,
      req.body.address,
    );
    await user.save();
    const {
      id, firstName, lastName, email, mobileno, isAdmin,
    } = user;
    const userToken = authtok.generateToken(id, isAdmin);
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
  static async userSignin(req, res) {
    const { error } = validateSignin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await currentUser(req.body.email);
    if (!user) return res.status(401).json({ message: 'Your email or password is incorrect' });
    const validPassword = authtok.comparePassword(user.password, req.body.password);
    if (!validPassword) return res.status(401).json({ message: 'Your email or password is incorrect' });
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
