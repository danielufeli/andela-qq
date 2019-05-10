const checkIsAdmin = (req, res, next) => {
  if (req.user.isAdmin === false) {
    return res.status(401).send({ status: 401, error: 'Access Denied, you need to be an Admin to gain access' });
  }
  return next();
};
export default checkIsAdmin;
