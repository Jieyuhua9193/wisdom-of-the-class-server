const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String },
  password: {
    type: String,
    set(val) {
      return bcrypt.hashSync(val, 10)
    }
  },
  phoneNumber: { type: String },
  avatar: { type: String },
  email: { type: String },
  isActivationed: { type: Boolean, default: false },
  system: { type: mongoose.SchemaTypes.ObjectId, ref: 'System' },
  realName: { type: String },
  role: { type: Number },
  class: { type: mongoose.SchemaTypes.ObjectId, ref: 'Class' },
  permissions: { type: Array },
  wxName: { type: String },
  wxNumber: { type: String },
  qq: { type: String },
  officeAddress: { type: String },
  studentId: { type: String },
  dormitory: { type: mongoose.SchemaTypes.ObjectId, ref: 'Dormitory' },
  family: { type: mongoose.SchemaTypes.ObjectId, ref: 'Family' },
  trajectory: { type: mongoose.SchemaTypes.ObjectId, ref: 'Trajectory' }
});

const adminModel = mongoose.model('User', userSchema);

export default adminModel