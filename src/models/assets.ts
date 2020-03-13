const mongoose = require('mongoose');
import moment = require('moment');

const Schema = mongoose.Schema;

const assetsSchema = new Schema({
  class: { type: mongoose.SchemaTypes.ObjectId, ref: 'Class' },
  toatlAssets: { type: Number, default: 0 }
});

const assetsRecordSchema = new Schema({
  class: { type: mongoose.SchemaTypes.ObjectId, ref: 'Class' },
  reason: { type: String },
  money: { type: Number },
  changeType: { type: Number },
  credentials: { type: String },
  students: { type: Array },
  dateTime: { type: String },
  operationPerson: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  gmtCreate: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }
})


const assetsModel = mongoose.model('Assets', assetsSchema);
export const assetsRecordModel = mongoose.model('AssetsRecord', assetsRecordSchema);

export default assetsModel