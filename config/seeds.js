/**
 * File to cread an admin user when app is created for the first time
 */

const User = require('../models/User');

const adminUser = {
  email: 'admin@admin.com',
  password: '1234',
  profile: {
    name: 'Admin',
  },
  isadmin: true,
  role: 'user'
};

exports.loadSeeds = () => {
  User.findOne({ email: adminUser.email }, (err, existingUser) => {
    if (err || existingUser) { return; }
    new User(adminUser).save((err) => {
      if (err) {
        return console.error('Error when seeding admin user');
      }

      console.log('Admin Created');
    });
  });
};

