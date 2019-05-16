import userObjects from './userObjects';

const getUserId = (req, res, next) => {
  const user = userObjects.singleUser(req);
  if (!user) return res.status(404).json({ status: 404, message: 'The user with the given email was not found' });
  return next();
};

export default getUserId;
