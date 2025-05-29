const express = require("express");
const router = express.Router();
const db = require("./db");
require("dotenv").config();

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create PaymentIntent
router.post("/create-payment-intent", async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    const amount = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity * 100; // in cents
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe payment intent error:", error);
    res.status(500).json({ message: "Failed to create payment intent" });
  }
});

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
    paymentIntentId,  // <- duhet të vijë nga frontend
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
    (first_name, last_name, phone, address, product_id, product_name, price, quantity, size, payment_intent_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      paymentIntentId,  // ruaj payment_intent_id
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


// GET all orders
router.get("/order", (req, res) => {
  const sql = `
    SELECT 
      id,
      first_name,
      last_name,
      phone,
      address,
      product_id,
      product_name,
      price,
      quantity,
      size,
      payment_intent_id,
      created_at
    FROM orders
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ message: "Failed to fetch orders" });
    }
    res.status(200).json(results);
  });
});

// DELETE order by ID
router.delete("/order/:id", (req, res) => {
  const orderId = req.params.id;

  db.query("DELETE FROM orders WHERE id = ?", [orderId], (err, result) => {
    if (err) {
      console.error("Error deleting order:", err);
      return res.status(500).json({ message: "Failed to delete order" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  });
});



module.exports = router;
