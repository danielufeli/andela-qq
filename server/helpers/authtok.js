import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authtok = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  generateToken(id, isAdmin) {
    const token = jwt.sign({ userid: id, admin: isAdmin }, process.env.jwtPrivateKey);
    return token;
  },
};
export default authtok;
