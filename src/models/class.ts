const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  schoolName: { type: String },
  department: { type: String },
  name: { type: String },
  avatar: { type: String },
  professional: { type: String },
  features: { type: String },
  dormitories: { type: Array },
  gmtCreate: {type: String }
});

const classModel = mongoose.model('Class', classSchema);

export default classModel
