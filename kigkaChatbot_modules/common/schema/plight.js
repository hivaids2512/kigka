var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var plightSchema = new Schema({
  name : { type: String, required: [true, 'Plight name is required'] },
  created : { type: Date, default: Date.now },
  keywords : [{ type: String, required: [true, 'Keywords is required'] }],
  outputType : { type: String, required: [true, 'Output Type is required'] },
  output : [{ type: Schema.Types.Mixed, required: [true, 'Output is required']}],
  bot : { type: Schema.Types.ObjectId, ref: 'bot' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
});

// the schema is useless so far
// we need to create a model using it
var plight = mongoose.model('plight', plightSchema);

// make this available to our users in our Node applications
module.exports = plight;