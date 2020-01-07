const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import SystemStatus from '../status/systemStatus'

const systemSchema = new Schema({
  classes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Classes' }],
  systemStatus: { type: Number, default: SystemStatus.experience },
  ownerUser: {},
  avatar: { type: String },
  teaches: [],
  students: [],
  createDate: { type: String }
});

const systemModel = mongoose.model('System', systemSchema);

export default systemModel