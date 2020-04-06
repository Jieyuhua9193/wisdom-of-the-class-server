const mongoose = require('mongoose');
import moment = require('moment');

const Schema = mongoose.Schema;

const emailSchema = new Schema({
  class: { type: mongoose.SchemaTypes.ObjectId, ref: 'Class' },
  target: { type: Object },
  emailHtml: { type: String },
  emailConfig: { type: Object },
  subject: { type: String },
  successCount: { type: Number },
  errorCount: { type: Number },
  errorUser: { type: Array },
  operation: { type: Object },
  isTiming: { type: Boolean, default: false },
  startAt: { type: String },
  status: { type: Number, default: 0 },
  gmtCreate: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }
});

const emailModel = mongoose.model('Email', emailSchema);

export default emailModel;
