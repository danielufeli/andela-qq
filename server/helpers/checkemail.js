import User from '../models/user';

const users = User.fetchAll();
const emailExists = email => users.some(el => el.email === email);

export default emailExists;
