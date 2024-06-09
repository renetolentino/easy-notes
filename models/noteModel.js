const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'você deve dar uma nota para a sua nota!'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
    required: [true, 'O campo note deve ser preenchido.'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: Boolean,
    default: true,
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
