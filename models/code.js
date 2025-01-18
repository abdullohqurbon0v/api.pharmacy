const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
     email: { type: String, required: true },
     code: { type: String, required: true },
     createdAt: { type: Date, default: Date.now, expires: 300 }
});

module.exports = mongoose.model('Code', codeSchema);
