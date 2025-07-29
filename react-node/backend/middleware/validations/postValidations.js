const { body } = require('express-validator');

// Validation for creating a new post
const validateCreatePost = [
  body('title')
    .isLength({ min: 1, max: 255 })
    .withMessage('Title is required and must be less than 255 characters')
    .trim(),
  body('content')
    .isLength({ min: 1 })
    .withMessage('Content is required')
    .trim()
];

// Validation for updating a post
const validateUpdatePost = [
  body('title')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be less than 255 characters')
    .trim(),
  body('content')
    .optional()
    .isLength({ min: 1 })
    .withMessage('Content cannot be empty')
    .trim()
];

module.exports = {
  validateCreatePost,
  validateUpdatePost
}; 