import User from '../models/user';

const users = User.fetchAll();
const currentUser = cemail => users.find(e => e.email === cemail);

export default currentUser;
