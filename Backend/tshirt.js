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

// 📌 Get all T-shirts
router.get("/", (req, res) => {
  const q = "SELECT * FROM tshirt";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// 📌 Get a single T-shirt by ID
router.get("/:id", (req, res) => {
  const q = "SELECT * FROM tshirt WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Tshirt not found" });
    return res.json(data[0]);
  });
});

// 📌 Add a new T-shirt with Image Upload
router.post("/", upload.single("cover"), (req, res) => {
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

// 📌 Update a T-shirt
router.put("/:id", upload.single("cover"), (req, res) => {
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

// 📌 Delete a T-shirt
router.delete("/:id", (req, res) => {
  const q = "DELETE FROM tshirt WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Tshirt deleted successfully" });
  });
});

module.exports = router;
