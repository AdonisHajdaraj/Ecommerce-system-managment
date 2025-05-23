const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Përdoret për të fshirë skedarët
const db = require("./db");

// 🛠 Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get all pants for men
router.get("/pants", (req, res) => {
  const q = "SELECT * FROM pants";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single pant by ID (men)
router.get("/pants/:id", (req, res) => {
  const q = "SELECT * FROM pants WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Pant not found" });
    return res.json(data[0]);
  });
});

// Add a new pant (men)
router.post("/pants", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO pants (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Pant has been created" });
  });
});

// Update pant (men)
router.put("/pants/:id", upload.single("cover"), (req, res) => {
  const pantId = req.params.id;

  db.query("SELECT cover FROM pants WHERE id = ?", [pantId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Pant not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE pants SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, pantId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Pant updated successfully" });
    });
  });
});

// Delete pant (men)
router.delete("/pants/:id", (req, res) => {
  const q = "DELETE FROM pants WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Pant deleted successfully" });
  });
});

// ----- ROUTES FOR FEMRA (pantswomen) -----

// Get all pants for women
router.get("/pantswomen", (req, res) => {
  const q = "SELECT * FROM pantswomen";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single pant by ID (women)
router.get("/pantswomen/:id", (req, res) => {
  const q = "SELECT * FROM pantswomen WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Pant not found" });
    return res.json(data[0]);
  });
});

// Add a new pant (women)
router.post("/pantswomen", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO pantswomen (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Pant has been created" });
  });
});

// Update pant (women)
router.put("/pantswomen/:id", upload.single("cover"), (req, res) => {
  const pantswomenId = req.params.id;

  db.query("SELECT cover FROM pantswomen WHERE id = ?", [pantswomenId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Pant not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE pantswomen SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, pantswomenId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Pant updated successfully" });
    });
  });
});

// Delete pant (women)
router.delete("/pantswomen/:id", (req, res) => {
  const q = "DELETE FROM pantswomen WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Pant deleted successfully" });
  });
});














// ----- ROUTES FOR femije (pantskids) -----

// Get all pants for kids
router.get("/pantskids", (req, res) => {
  const q = "SELECT * FROM pantskids";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single pant by ID (kids)
router.get("/pantskids/:id", (req, res) => {
  const q = "SELECT * FROM pantskids WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Pant not found" });
    return res.json(data[0]);
  });
});

// Add a new pant (kids)
router.post("/pantskids", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO pantskids (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Pant has been created" });
  });
});

// Update pant (kids)
router.put("/pantskids/:id", upload.single("cover"), (req, res) => {
  const pantskidsId = req.params.id;

  db.query("SELECT cover FROM pantskids WHERE id = ?", [pantskidsId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Pant not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE pantskids SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, pantskidsId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Pant updated successfully" });
    });
  });
});

// Delete pant (women)
router.delete("/pantskids/:id", (req, res) => {
  const q = "DELETE FROM pantskids WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Pant deleted successfully" });
  });
});


module.exports = router;
