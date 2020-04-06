const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment-fix');

const dormitorySchema = new Schema({
  class: { type: mongoose.SchemaTypes.ObjectId, ref: 'Class' },
  number: { type: String },
  type: { type: Number },
  students: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }]
  // dor_id: {type: Number }
});

// autoIncrement.initialize(mongoose.connection);

// dormitorySchema.plugin(autoIncrement.plugin, {
//   model: 'Dormitory',
//   field: 'dor_id',
//   startAt: 10000,
//   unique: true,
//   incrementBy: 1
// })

const dormitoryModel = mongoose.model('Dormitory', dormitorySchema)

export default dormitoryModel
