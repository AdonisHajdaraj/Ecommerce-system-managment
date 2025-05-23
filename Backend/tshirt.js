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

// ----- ROUTES FOR MESHKUJ (tshirt) -----

// Get all tshirts for men
router.get("/tshirt", (req, res) => {
  const q = "SELECT * FROM tshirt";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single tshirt by ID (men)
router.get("/tshirt/:id", (req, res) => {
  const q = "SELECT * FROM tshirt WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Tshirt not found" });
    return res.json(data[0]);
  });
});

// Add a new tshirt (men)
router.post("/tshirt", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO tshirt (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Tshirt has been created" });
  });
});

// Update tshirt (men)
router.put("/tshirt/:id", upload.single("cover"), (req, res) => {
  const tshirtId = req.params.id;

  db.query("SELECT cover FROM tshirt WHERE id = ?", [tshirtId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Tshirt not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE tshirt SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, tshirtId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Tshirt updated successfully" });
    });
  });
});

// Delete tshirt (men)
router.delete("/tshirt/:id", (req, res) => {
  const q = "DELETE FROM tshirt WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Tshirt deleted successfully" });
  });
});

// ----- ROUTES FOR FEMRA (tshirtwomen) -----

// Get all tshirts for women
router.get("/tshirtwomen", (req, res) => {
  const q = "SELECT * FROM tshirtwomen";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single tshirt by ID (women)
router.get("/tshirtwomen/:id", (req, res) => {
  const q = "SELECT * FROM tshirtwomen WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Tshirt not found" });
    return res.json(data[0]);
  });
});

// Add a new tshirt (women)
router.post("/tshirtwomen", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO tshirtwomen (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Tshirt has been created" });
  });
});

// Update tshirt (women)
router.put("/tshirtwomen/:id", upload.single("cover"), (req, res) => {
  const tshirtwomenId = req.params.id;

  db.query("SELECT cover FROM tshirtwomen WHERE id = ?", [tshirtwomenId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Tshirt not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE tshirtwomen SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, tshirtwomenId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Tshirt updated successfully" });
    });
  });
});

// Delete tshirt (women)
router.delete("/tshirtwomen/:id", (req, res) => {
  const q = "DELETE FROM tshirtwomen WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Tshirt deleted successfully" });
  });
});














// ----- ROUTES FOR femije (tshirtkids) -----

// Get all tshirts for kids
router.get("/tshirtkids", (req, res) => {
  const q = "SELECT * FROM tshirtkids";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single tshirt by ID (kids)
router.get("/tshirtkids/:id", (req, res) => {
  const q = "SELECT * FROM tshirtkids WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Tshirt not found" });
    return res.json(data[0]);
  });
});

// Add a new tshirt (kids)
router.post("/tshirtkids", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO tshirtkids (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Tshirt has been created" });
  });
});

// Update tshirt (kids)
router.put("/tshirtkids/:id", upload.single("cover"), (req, res) => {
  const tshirtkidsId = req.params.id;

  db.query("SELECT cover FROM tshirtkids WHERE id = ?", [tshirtkidsId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "Tshirt not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE tshirtkids SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, tshirtkidsId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Tshirt updated successfully" });
    });
  });
});

// Delete tshirt (women)
router.delete("/tshirtkids/:id", (req, res) => {
  const q = "DELETE FROM tshirtkids WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Tshirt deleted successfully" });
  });
});

module.exports = router;
