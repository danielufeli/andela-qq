import users from '../db/Users';

class User {
  constructor(email, mobileno, firstName, lastName, password, address) {
    this.id = users.length + 1;
    this.email = email;
    this.mobileno = mobileno;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.address = address;
    this.status = 'unverified';
    this.isAdmin = false;
  }

  save() {
    users.push(this);
  }

  static fetchAll() {
    return users;
  }

  static currentUser(cemail) {
    return users.find(e => e.email === cemail);
  }

  static updateUserStatus(user, userstatus) {
    Object.assign(user, { status: userstatus });
  }
}

export default User;
