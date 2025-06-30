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


router.get("/", (req, res) => {
  const q = "SELECT * FROM hat";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// 📌 Get a single Hat by ID
router.get("/:id", (req, res) => {
  const q = "SELECT * FROM hat WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "hat not found" });
    return res.json(data[0]);
  });
});


router.post("/", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO hat (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null, 
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "hat has been created" });
  });
});

// 📌 Update a Hat
router.put("/:id", upload.single("cover"), (req, res) => {
  const hatId = req.params.id;

  db.query("SELECT cover FROM hat WHERE id = ?", [hatId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "hat not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;


    const q = "UPDATE hat SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, hatId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "hat updated successfully" });
    });
  });
});


router.delete("/:id", (req, res) => {
  const q = "DELETE FROM hat WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "hat deleted successfully" });
  });
});

module.exports = router;

