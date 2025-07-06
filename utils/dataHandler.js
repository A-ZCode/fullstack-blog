const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../posts.json');

// Read all posts
function getPosts() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

// Save posts
function savePosts(posts) {
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');
}

module.exports = { getPosts, savePosts };
