const users = [];

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
    this.isAdmin = 'false';
  }

  save() {
    users.push(this);
  }

  static fetchAll() {
    return users;
  }
}

export default User;
