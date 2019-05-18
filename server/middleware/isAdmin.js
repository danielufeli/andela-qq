const checkIsAdmin = (req, res, next) => {
  if (req.user.isadmin === false) { return res.status(401).send({ status: 403, error: 'Forbidden Access: You need to be an Admin to gain access' }); }
  return next();
};
export default checkIsAdmin;
