// All the required tools are imported to organize our routes
// read posts and save posts to posts.json
const express = require('express');
const router = express.Router();
const { getPosts, savePosts } = require('../utils/dataHandler');

// GET all posts
router.get('/', (req, res) => {
  const posts = getPosts();
  res.json(posts);
});

// GET one post by ID
router.get('/:id', (req, res) => {
  const posts = getPosts();
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// POST - Create new post
router.post('/', (req, res) => {
  const posts = getPosts();
  const newPost = {
    id: Date.now(), // simple unique ID
    title: req.body.title,
    content: req.body.content,
    author: req.body.author || 'Anonymous',
    date: new Date().toISOString()
  };
  posts.push(newPost);
  savePosts(posts);
  res.status(201).json({ id: newPost.id, message: 'Post created successfully' });
});

// PUT - Update a post
router.put('/:id', (req, res) => {
  const posts = getPosts();
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Post not found' });

  posts[index] = {
    ...posts[index],
    title: req.body.title,
    content: req.body.content,
    author: req.body.author || posts[index].author,
  };

  savePosts(posts);
  res.json({ message: 'Post updated successfully' });
});

// DELETE - Delete a post
router.delete('/:id', (req, res) => {
  let posts = getPosts();
  const newPosts = posts.filter(p => p.id !== parseInt(req.params.id));
  if (posts.length === newPosts.length) return res.status(404).json({ message: 'Post not found' });

  savePosts(newPosts);
  res.json({ message: 'Post deleted successfully' });
});

module.exports = router;
