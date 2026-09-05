const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
    }
  },
);

module.exports = mongoose.model('Student', studentSchema);
