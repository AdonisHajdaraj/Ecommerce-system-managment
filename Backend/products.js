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

router.get('/products/count', (req, res) => {
    const type = req.query.type;
    if (!type) {
        return res.status(400).json({ error: 'Type duhet të specifikohet' });
    }

    const sql = 'SELECT COUNT(*) AS count FROM products WHERE lloji = ?';
    db.query(sql, [type], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gabim në server' });
        }
        res.json({ count: results[0].count });
    });
});

module.exports = router;
