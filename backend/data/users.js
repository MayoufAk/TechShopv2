import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Pool User',
    email: 'pool@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Mark Doe',
    email: 'mark@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;