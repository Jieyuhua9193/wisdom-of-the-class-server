const mongoose = require('mongoose');
import moment = require('moment');

const Schema = mongoose.Schema;

const classSchema = new Schema({
  users: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  schoolName: { type: String },
  department: { type: String },
  name: { type: String },
  avatar: { type: String },
  professional: { type: String },
  features: { type: String },
  dormitories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Dormitory' }],
  gmtCreate: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') },
  admin: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  invitationCode: { type: Object }
});

const classModel = mongoose.model('Class', classSchema);

export default classModel
