import dotenv from 'dotenv';
import User from '../models/user';
import validateUser from '../helpers/validation/users';
import emailExists from '../helpers/checkemail';
import authtok from '../helpers/authtok';

dotenv.config();

class userController {
  static async userSignup(req, res) {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    if (emailExists(req.body.email)) return res.status(400).json('The Email you Entered Already Exists');
    const hash = authtok.hashPassword(req.body.password);
    const user = new User(
      req.body.email,
      req.body.mobileno,
      req.body.firstName,
      req.body.lastName,
      hash,
      req.body.addresss,
      req.body.status,
      req.body.isAdmin,
    );
    await user.save();
    const {
      id, firstName, lastName, email, mobileno, isAdmin,
    } = user;
    const token = authtok.generateToken(id, isAdmin);
    return res.status(201).json({
      status: 201,
      data: {
        token,
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
