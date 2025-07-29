const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Populate author when querying posts
postSchema.pre('find', function () {
  this.populate('author', 'username email firstName lastName');
});

postSchema.pre('findOne', function () {
  this.populate('author', 'username email firstName lastName');
});

module.exports = mongoose.model('Post', postSchema); 