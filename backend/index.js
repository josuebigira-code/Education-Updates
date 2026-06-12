require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { router: authRouter, auth } = require('./routes/auth');
const createRouter = require('./routes/crud');
const uploadRouter = require('./routes/upload');
const statsRouter = require('./routes/stats');
const subscribersRouter = require('./routes/subscribers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Public Routes
app.use('/api/auth', authRouter);
app.use('/api/news', createRouter('news'));
app.use('/api/videos', createRouter('videos'));
app.use('/api/scholarships', createRouter('scholarships'));
app.use('/api/resources', createRouter('resources'));
app.use('/api/gallery', createRouter('gallery'));
app.use('/api/team', createRouter('team'));
app.use('/api/subscribers', subscribersRouter);
app.use('/api/contacts', createRouter('contacts'));
app.use('/api/stats', statsRouter);

// Protected Routes
app.use('/api/upload', uploadRouter);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'));
  });
}

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
