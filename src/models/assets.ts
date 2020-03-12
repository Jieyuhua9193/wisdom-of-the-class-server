const mongoose = require('mongoose');
import moment = require('moment');

const Schema = mongoose.Schema;

const assetsSchema = new Schema({
  class: { type: mongoose.SchemaTypes.ObjectId, ref: 'Class' },
  toatlAssets: { type: Number, default: 0 },
  record: [{
    reason: { type: String },
    changeType: { type: Number },
    credentials: { type: String },
    operationPerson: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    gmtCreate: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }
  }]
});

const assetsModel = mongoose.model('Assets', assetsSchema);

export default assetsModel