const mongoose = require('mongoose');

const studentSchema = {
  firstName: String,
  lastName: String,
  salary: Number,
  bonusPoints: { type: Number, default: 1000 }
};
