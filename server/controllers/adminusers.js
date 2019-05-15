import currentUser from '../helpers/currentUser';
import validateUserStatus from '../helpers/validation/status';

class adminUserController {
  static adminVerifyUser(req, res) {
    const user = currentUser(req.params.useremail);
    if (!user) return res.status(404).json({ message: 'The user with the given email was not found' });
    const { error } = validateUserStatus(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    Object.assign(user, { status: req.body.status });
    const {
      email, firstName, lastName, password, address, status,
    } = user;
    return res.status(200).json({
      status: 200,
      data: {
        email,
        firstName,
        lastName,
        password,
        address,
        status,
      },
    });
  }
}

export default adminUserController;
