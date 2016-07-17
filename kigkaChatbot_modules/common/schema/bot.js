var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var botSchema = new Schema({
	name : { type: String, required: [true, 'Bot name is required'] },
  	accesstoken :  { type: String, required: [true, 'Access Token is required'] },
  	created : { type: Date, default: Date.now },
  	createdBy : { type: Schema.Types.ObjectId, ref: 'user' },
});

// the schema is useless so far
// we need to create a model using it
var bot = mongoose.model('bot', botSchema);

// make this available to our users in our Node applications
module.exports = bot;