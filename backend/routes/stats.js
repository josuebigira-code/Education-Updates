const express = require('express');
const db = require('../db');

const router = express.Router();

// GET stats (returns the first row or empty object)
router.get('/', async (req, res) => {
  try {
    const stats = await db('stats').first();
    res.json(stats || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT stats (updates the first row or creates it)
router.put('/', async (req, res) => {
  try {
    const stats = await db('stats').first();
    if (stats) {
      await db('stats').where({ id: stats.id }).update(req.body);
    } else {
      await db('stats').insert(req.body);
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
