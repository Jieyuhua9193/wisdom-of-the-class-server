const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import SettlementType from '../status/settings'

const settingsSchema = new Schema({
  activeRule: {
    settlementType: {
      type: Number,
      default: SettlementType.Manual
    }
  }
});

const activeModel = mongoose.model('Settings', settingsSchema);

export default activeModel
