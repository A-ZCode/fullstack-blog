const cors = require('cors');
const express = require('express');
const app = express();
const postsRouter = require('./routes/posts');

const PORT = process.env.PORT || 3000; // dynamic port

app.use(cors());
app.use(express.json());

// API Routes
app.use('/posts', postsRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Blog API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

