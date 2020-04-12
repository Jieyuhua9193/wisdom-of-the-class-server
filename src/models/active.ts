const mongoose = require('mongoose');
import moment = require('moment');

const Schema = mongoose.Schema;

const activeSchema = new Schema({
  class: { type: mongoose.SchemaTypes.ObjectId, ref: 'Class' },
  name: String,
  desc: String,
  detail: String,
  imgs: Array,
  status: Number,
  type: Number,
  number: Number,
  score: Number,
  bookingAt: Number,
  bookingEnd: Number,
  startAt: Number,
  endAt: Number,
  gmtCreate: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  createUser: Object,
  student: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }]
});

const activeModel = mongoose.model('Active', activeSchema);

export default activeModel
