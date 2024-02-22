const express = require('express');
const router = express.Router();
const Client = require('../models/client');

router.post('/', (req, res) => {
  const { name, companyId, userId, email, phone } = req.body;

  // Add logic to validate company availability

  Client.createClient(name, companyId, userId, email, phone, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Client created successfully' });
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: 'No updates provided' });
    return;
  }

  for (const field in updates) {
    Client.updateClientField(id, field, updates[field], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
    });
  }

  res.json({ message: 'Client updated successfully' });
});

module.exports = router;
