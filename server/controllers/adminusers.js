import userObjects from '../middleware/userObjects';

class adminUserController {
  static adminVerifyUser(req, res) {
    const user = userObjects.singleUser(req);
    userObjects.verifyUser(user, req);
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
