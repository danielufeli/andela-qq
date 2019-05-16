import userObjects from '../middleware/userObjects';

export default class checkUser {
  static findUserExist(req, res, next) {
    const user = userObjects.getUser(req);
    if (user) return res.status(401).json({ status: 401, message: 'User Already Registered.' });
    return next();
  }

  static findUserNotExist(req, res, next) {
    const user = userObjects.getUser(req);
    if (!user) return res.status(401).json({ status: 401, message: 'Your email or password is incorrect' });
    return next();
  }
}
