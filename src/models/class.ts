const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  users: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
  schoolName: { type: String },
  department: { type: String },
  name: { type: String },
  avatar: { type: String },
  professional: { type: String },
  features: { type: String },
  dormitories: { type: Array },
  gmtCreate: {type: String },
  admin: { type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
});

const classModel = mongoose.model('Class', classSchema);

export default classModel
