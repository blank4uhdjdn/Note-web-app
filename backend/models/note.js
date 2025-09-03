
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user:
     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: 
    { type: String, default: '' },
    body: 
    { type: String, required: true },
    createdAt: 
    { type: Date, default: Date.now }
});
const Note=mongoose.model('Note', noteSchema);

module.exports = Note
