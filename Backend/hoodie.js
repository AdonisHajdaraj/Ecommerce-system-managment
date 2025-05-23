const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
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

// ----- ROUTES FOR MESHKUJ (hoodie) -----

// Get all hoodie for men
router.get("/hoodie", (req, res) => {
  const q = "SELECT * FROM hoodie";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single hoodie by ID (men)
router.get("/hoodie/:id", (req, res) => {
  const q = "SELECT * FROM hoodie WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Hoodie not found" });
    return res.json(data[0]);
  });
});

// Add a new hoodie (men)
router.post("/hoodie", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO hoodie (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Hoodie has been created" });
  });
});

// Update hoodie (men)
router.put("/hoodie/:id", upload.single("cover"), (req, res) => {
  const hoodieId = req.params.id;

  db.query("SELECT cover FROM hoodie WHERE id = ?", [hoodieId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Hoodie not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE hoodie SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, hoodieId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Hoodie updated successfully" });
    });
  });
});

// Delete hoodie (men)
router.delete("/hoodie/:id", (req, res) => {
  const q = "DELETE FROM hoodie WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Hoodie deleted successfully" });
  });
});
















// ----- ROUTES FOR femra (hoodie) -----

// Get all hoodie for women
router.get("/hoodiewomen", (req, res) => {
  const q = "SELECT * FROM hoodiewomen";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single hoodie by ID (women)
router.get("/hoodiewomen/:id", (req, res) => {
  const q = "SELECT * FROM hoodiewomen WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Hoodie not found" });
    return res.json(data[0]);
  });
});

// Add a new hoodie (women)
router.post("/hoodiewomen", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO hoodiewomen (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Hoodie has been created" });
  });
});

// Update hoodie (women)
router.put("/hoodiewomen/:id", upload.single("cover"), (req, res) => {
  const hoodiewomenId = req.params.id;

  db.query("SELECT cover FROM hoodiewomen WHERE id = ?", [hoodiewomenId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Hoodie not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE hoodiewomen SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, hoodiewomenId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Hoodie updated successfully" });
    });
  });
});

// Delete hoodie (women)
router.delete("/hoodiewomen/:id", (req, res) => {
  const q = "DELETE FROM hoodiewomen WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Hoodie deleted successfully" });
  });
});








// ----- ROUTES FOR femije (hoodie) -----

// Get all hoodie for kids
router.get("/hoodiekids", (req, res) => {
  const q = "SELECT * FROM hoodiekids";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single hoodie by ID (kids)
router.get("/hoodiekids/:id", (req, res) => {
  const q = "SELECT * FROM hoodiekids WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Hoodie not found" });
    return res.json(data[0]);
  });
});

// Add a new hoodie (kids)
router.post("/hoodiekids", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO hoodiekids (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Hoodie has been created" });
  });
});

// Update hoodie (kids)
router.put("/hoodiekids/:id", upload.single("cover"), (req, res) => {
  const hoodiekidsId = req.params.id;

  db.query("SELECT cover FROM hoodiekids WHERE id = ?", [hoodiekidsId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Hoodie not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE hoodiekids SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, hoodiekidsId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Hoodie updated successfully" });
    });
  });
});

// Delete hoodie (women)
router.delete("/hoodiekids/:id", (req, res) => {
  const q = "DELETE FROM hoodiekids WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Hoodie deleted successfully" });
  });
});

module.exports = router;