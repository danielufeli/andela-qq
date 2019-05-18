
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authtok = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  generateToken(id, isadmin) {
    const token = jwt.sign({ userid: id, admin: isadmin }, process.env.jwtPrivateKey);
    return token;
  },
};
export default authtok;
