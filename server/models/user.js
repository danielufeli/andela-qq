const users = [
  {
    id: 1,
    email: 'admin@quickcredit.com',
    mobileno: '08082205956',
    firstName: 'Daniel',
    lastName: 'Ufeli',
    password: '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe',
    address: '26, Fagbeyiro Street, Alakuko',
    status: 'verified',
    isAdmin: true,
  },
  {
    id: 2,
    email: 'user@quickcredit.com',
    mobileno: '08082205956',
    firstName: 'Daniel',
    lastName: 'Ufeli',
    password: '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe',
    address: '26, Fagbeyiro Street, Alakuko',
    status: 'verified',
    isAdmin: false,
  },
  {
    id: 3,
    email: 'user1@quickcredit.com',
    mobileno: '08082205956',
    firstName: 'Daniel',
    lastName: 'Ufeli',
    password: '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe',
    address: '26, Fagbeyiro Street, Alakuko',
    status: 'verified',
    isAdmin: false,
  },
];

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
}

export default User;
