const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/order", (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    address,
    productId,
    productName,
    price,
    quantity,
    size,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !address ||
    !productId ||
    !productName ||
    !price ||
    !quantity ||
    !size
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const createdAt = new Date();

  const sql = `
    INSERT INTO orders
    (first_name, last_name, phone, address, product_id, product_name, price, quantity, size, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      firstName,
      lastName,
      phone,
      address,
      productId,
      productName,
      price,
      quantity,
      size,
      createdAt,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting order:", err);
        return res.status(500).json({ message: "Failed to place order" });
      }
      res.status(201).json({ message: "Order placed successfully" });
    }
  );
});


//admin view orders
router.get("/order", (req, res) => {
  const sql = "SELECT * FROM orders ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ message: "Failed to fetch orders" });
    }
    res.status(200).json(results);
  });
});

// admin delete order
router.delete("/order/:id", (req, res) => {
  const orderId = req.params.id;

  const sql = "DELETE FROM orders WHERE id = ?";
  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error("Error deleting order:", err);
      return res.status(500).json({ message: "Failed to delete order" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  });
});



module.exports = router;
