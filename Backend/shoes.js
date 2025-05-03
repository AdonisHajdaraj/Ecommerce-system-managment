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

// 📌 Get all Shoes
router.get("/", (req, res) => {
  const q = "SELECT * FROM shoes";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// 📌 Get a single Shoe by ID
router.get("/:id", (req, res) => {
  const q = "SELECT * FROM shoes WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "shoe not found" });
    return res.json(data[0]);
  });
});

// 📌 Add a new Shoe with Image Upload
router.post("/", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO shoes (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "shoe has been created" });
  });
});

// 📌 Update a Shoe
router.put("/:id", upload.single("cover"), (req, res) => {
  const shoeId = req.params.id;

  db.query("SELECT cover FROM shoes WHERE id = ?", [shoeId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "shoe not found" });

    const oldCover = result[0].cover;
    const newCover = req.file ? `/uploads/${req.file.filename}` : oldCover;

    const q = "UPDATE shoes SET `name` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newCover, shoeId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      // Fshi skedarin e vjetër nëse ekziston
      if (oldCover && fs.existsSync(path.join(__dirname, '..', oldCover))) {
        fs.unlinkSync(path.join(__dirname, '..', oldCover));
      }
      return res.json({ message: "shoe updated successfully" });
    });
  });
});

// 📌 Delete a Shoe
router.delete("/:id", (req, res) => {
  // Gjejmë coverin e produktit që do të fshihet
  db.query("SELECT cover FROM shoes WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.status(404).json({ message: "shoe not found" });

    const coverToDelete = result[0].cover;
    
    const q = "DELETE FROM shoes WHERE id = ?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.json(err);
      
      // Fshi skedarin e imazhit nga disk nëse ekziston
      if (coverToDelete && fs.existsSync(path.join(__dirname, '..', coverToDelete))) {
        fs.unlinkSync(path.join(__dirname, '..', coverToDelete));
      }
      
      return res.json({ message: "shoe deleted successfully" });
    });
  });
});

module.exports = router;
