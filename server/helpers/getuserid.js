import User from '../models/user';

const users = User.fetchAll();
const getUserId = userId => users.find(e => e.id === userId);

export default getUserId;
