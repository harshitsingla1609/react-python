const express = require('express');
const auth = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validations/validationHandler');
const {
  validateCreatePost,
  validateUpdatePost
} = require('../middleware/validations/postValidations');
const {
  getAllPosts,
  getMyPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, getAllPosts);

// @route   GET /api/posts/my-posts
// @desc    Get current user's posts
// @access  Private
router.get('/my-posts', auth, getMyPosts);

// @route   GET /api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, getPostById);

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post('/', auth, validateCreatePost, handleValidationErrors, createPost);

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private
router.put('/:id', auth, validateUpdatePost, handleValidationErrors, updatePost);

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, deletePost);

module.exports = router; 