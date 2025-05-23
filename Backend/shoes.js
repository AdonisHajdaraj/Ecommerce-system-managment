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

// Get all shoes for men
router.get("/shoes", (req, res) => {
  const q = "SELECT * FROM shoes";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single shoe by ID (men)
router.get("/shoes/:id", (req, res) => {
  const q = "SELECT * FROM shoes WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Shoe not found" });
    return res.json(data[0]);
  });
});

// Add a new shoe (men)
router.post("/shoes", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO shoes (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Shoe has been created" });
  });
});

// Update shoe (men)
router.put("/shoes/:id", upload.single("cover"), (req, res) => {
  const shoeId = req.params.id;

  db.query("SELECT cover FROM shoes WHERE id = ?", [shoeId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Shoe not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE shoes SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, shoeId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Shoe updated successfully" });
    });
  });
});

// Delete shoe (men)
router.delete("/shoes/:id", (req, res) => {
  const q = "DELETE FROM shoes WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Shoe deleted successfully" });
  });
});

// ----- ROUTES FOR FEMRA (shoewomen) -----

// Get all shoes for women
router.get("/shoewomen", (req, res) => {
  const q = "SELECT * FROM shoewomen";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single shoe by ID (women)
router.get("/shoewomen/:id", (req, res) => {
  const q = "SELECT * FROM shoewomen WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Shoe not found" });
    return res.json(data[0]);
  });
});

// Add a new shoe (women)
router.post("/shoewomen", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO shoewomen (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Shoe has been created" });
  });
});

// Update shoe (women)
router.put("/shoewomen/:id", upload.single("cover"), (req, res) => {
  const shoeswomenId = req.params.id;

  db.query("SELECT cover FROM shoewomen WHERE id = ?", [shoeswomenId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Shoe not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE shoewomen SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, shoeswomenId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Shoe updated successfully" });
    });
  });
});

// Delete shoe (women)
router.delete("/shoewomen/:id", (req, res) => {
  const q = "DELETE FROM shoewomen WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Shoe deleted successfully" });
  });
});














// ----- ROUTES FOR femije (tshirtkids) -----

// Get all shoes for kids
router.get("/shoeskids", (req, res) => {
  const q = "SELECT * FROM shoeskids";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single shoe by ID (kids)
router.get("/shoeskids/:id", (req, res) => {
  const q = "SELECT * FROM shoeskids WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Shoe not found" });
    return res.json(data[0]);
  });
});

// Add a new shoe (kids)
router.post("/shoeskids", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO shoeskids (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Shoe has been created" });
  });
});

// Update shoe (kids)
router.put("/shoeskids/:id", upload.single("cover"), (req, res) => {
  const shoeskidsId = req.params.id;

  db.query("SELECT cover FROM shoeskids WHERE id = ?", [shoeskidsId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Shoe not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE shoeskids SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, shoeskidsId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Shoe updated successfully" });
    });
  });
});

// Delete shoe (women)
router.delete("/shoeskids/:id", (req, res) => {
  const q = "DELETE FROM shoeskids WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Shoe deleted successfully" });
  });
});


module.exports = router;
