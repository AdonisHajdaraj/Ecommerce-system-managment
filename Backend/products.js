const express = require('express');
const router = express.Router();
const db = require('./db');


router.get('/', (req, res) => {
  const query = `
    SELECT id, name AS lloji, 'bags' AS kategoria FROM bag
    UNION ALL
    SELECT id, name AS lloji, 'shoes' AS kategoria FROM shoes
    UNION ALL
    SELECT id, name AS lloji, 'tshirt' AS kategoria FROM tshirt
  `;

  // Ekzekutimi i query-së
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err); // Regjistroni gabimin për debug
      return res.status(500).json({ error: err.message });
    }
    
    // Kthe të dhënat
    res.json(results);
  });
});

module.exports = router;
