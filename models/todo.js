const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 120
    },
    greenHeart: {
      type: String
    },
    orangeHeart: {
      type: String
    },
    redHeart: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'publishingDate',
      updatedAt: 'editingDate'
    }
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
