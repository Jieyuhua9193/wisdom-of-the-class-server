import moment = require("moment");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trajectorySchema = new Schema({
  gmtCreate: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  email: { type: String },
  traceText: { type: String },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
});

const trajectoryModel = mongoose.model('Trajectory', trajectorySchema);

export default trajectoryModel
