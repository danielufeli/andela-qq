
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authtok = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  generateToken(id, isadmin, email, firstname, lastname) {
    const token = jwt.sign({
      userid: id, admin: isadmin, uemail: email, fname: firstname, lname: lastname,
    }, process.env.jwtPrivateKey);
    return token;
  },
};
export default authtok;
