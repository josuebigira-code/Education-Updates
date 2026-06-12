const express = require('express');
const db = require('../db');

const router = express.Router();

// GET all subscribers
router.get('/', async (req, res) => {
  try {
    const items = await db('subscribers').select('*').orderBy('id', 'desc');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new subscriber
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  try {
    // Check if already exists
    const existing = await db('subscribers').where({ email }).first();
    if (existing) return res.json({ ok: true, message: 'Already subscribed' });

    await db('subscribers').insert({ email });
    res.status(201).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE subscriber (by email or ID)
router.delete('/:id?', async (req, res) => {
  const id = req.params.id || req.query.id;
  const { email } = req.body;
  try {
    let deleted;
    if (id) {
      deleted = await db('subscribers').where({ id }).del();
    } else if (email) {
      deleted = await db('subscribers').where({ email }).del();
    } else {
      return res.status(400).json({ error: 'ID or Email required' });
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
