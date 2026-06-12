const express = require('express');
const db = require('../db');

function createRouter(tableName) {
  const router = express.Router();

  // GET all
  router.get('/', async (req, res) => {
    try {
      const items = await db(tableName).select('*').orderBy('id', 'desc');
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET one
  router.get('/:id?', async (req, res) => {
    const id = req.params.id || req.query.id;
    if (!id) {
      // If no id, it might be the "GET all" if we combined them, but we have a separate one for /
      // However, if we are at /, it goes to the first route.
      // If we are at /:id, it comes here.
      // So if we are here and have no id, something is wrong or it's /.
      // Let's just return all if no id is provided to this route as well.
      try {
        const items = await db(tableName).select('*').orderBy('id', 'desc');
        return res.json(items);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    try {
      const item = await db(tableName).where({ id }).first();
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST
  router.post('/', async (req, res) => {
    try {
      const [id] = await db(tableName).insert(req.body).returning('id');
      res.status(201).json({ id: typeof id === 'object' ? id.id : id, ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT
  router.put('/:id?', async (req, res) => {
    const id = req.params.id || req.query.id;
    if (!id) return res.status(400).json({ error: 'ID required' });
    try {
      const updated = await db(tableName).where({ id }).update(req.body);
      if (!updated) return res.status(404).json({ error: 'Not found' });
      res.json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE
  router.delete('/:id?', async (req, res) => {
    const id = req.params.id || req.query.id;
    if (!id) return res.status(400).json({ error: 'ID required' });
    try {
      const deleted = await db(tableName).where({ id }).del();
      if (!deleted) return res.status(404).json({ error: 'Not found' });
      res.json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

module.exports = createRouter;
