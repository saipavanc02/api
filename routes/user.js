const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
  User.getAllUsers((err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  User.updateUser(id, username, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'User updated successfully' });
  });
});

router.post('/users', (req, res) => {
  const { username, email } = req.body;

  User.createUser(username, email, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'User created successfully' });
  });
});

module.exports = router;
