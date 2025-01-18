const { Schema, model } = require('mongoose');

const userSchema = new Schema({
     firstName: { type: String, required: true },
     lastName: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     role: { type: String, default: "User" }
}, {
     timestamps: true
});

module.exports = model('User', userSchema);
