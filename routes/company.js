const express = require('express');
const router = express.Router();
const Company = require('../models/company');

router.get('/', (req, res) => {
  const { minEmployees, maxEmployees } = req.query;

  if (minEmployees && maxEmployees) {
    Company.getCompaniesByEmployeeRange(minEmployees, maxEmployees, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  } else {
    res.status(400).json({ error: 'Both minEmployees and maxEmployees are required for this query' });
  }
});

module.exports = router;
