const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require('path');
const multer = require('multer');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

const db = require('./db');

// 🛠 Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  }
});
const upload = multer({ storage });

// 📌 Get all T-shirts
app.get("/tshirt", (req, res) => {
  const q = "SELECT * FROM tshirt";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// 📌 Get a single T-shirt by ID
app.get("/tshirt/:id", (req, res) => {
  const q = "SELECT * FROM tshirt WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Tshirt not found" });
    return res.json(data[0]);
  });
});

// 📌 Add a new T-shirt with Image Upload
app.post("/tshirt", upload.single('cover'), (req, res) => {
  const q = "INSERT INTO tshirt (`name`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file ? `/uploads/${req.file.filename}` : null // Save file path in DB
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Tshirt has been created" });
  });
});

// 📌 Update a T-shirt (Retain Old Image if No New One)
app.put("/tshirt/:id", upload.single('cover'), (req, res) => {
  const tshirtId = req.params.id;

  // Fetch current cover image
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
app.delete("/tshirt/:id", (req, res) => {
  const q = "DELETE FROM tshirt WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: "Tshirt deleted successfully" });
  });
});

app.listen(3002, () => {
  console.log("Server is listening on port 3002");
});
