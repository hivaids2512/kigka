var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('MD5');

// create a schema
var userSchema = new Schema({
    username: { type: String, required: [true, 'Username is required'] },
    firstname: { type: String, required: [true, 'First name is required'] },
    lastname: { type: String, required: [true, 'Last name is required'] },
    password: { type: String, required: [true, 'Password name is required'] },
    email: { type: String, required: [true, 'Email name is required'] },
    lastAccess: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
});

userSchema.pre('save', function(next) {
    this.password = md5(this.password);
    next();
});

// the schema is useless so far
// we need to create a model using it
var user = mongoose.model('user', userSchema);

// make this available to our users in our Node applications
module.exports = user;
