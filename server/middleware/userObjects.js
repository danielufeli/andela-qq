import User from '../models/user';

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

  static getUser(req) {
    const user = User.currentUser(req.body.email);
    return user;
  }

  static getUsersId(req) {
    const user = User.userById(req.user.id);
    return user;
  }
}
