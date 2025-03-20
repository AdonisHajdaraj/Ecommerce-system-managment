const express = require('express');
const router = express.Router();
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'my_secret_key';

// 🔹 REGISTER
router.post('/v1/register', async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, ?)";

        db.query(sql, [name, email, hashedPassword, role], (err, result) => {
            if (err) {
                console.error('Gabim në databazë:', err);
                return res.status(500).json({ message: "Gabim gjatë regjistrimit." });
            }

            const userId = result.insertId;
            const payload = { id: userId, name, email, role };
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

            return res.status(201).json({
                message: "Regjistrimi u krye me sukses",
                token,
                userId,
                userName: name,
                userEmail: email,
                role
            });
        });
    } catch (error) {
        console.error("Gabim me bcrypt:", error);
        return res.status(500).json({ message: "Gabim gjatë enkriptimit të fjalëkalimit." });
    }
});

// 🔹 LOGIN (SIGN IN)
router.post('/v1/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email dhe fjalëkalimi janë të detyrueshëm." });
    }

    const sql = "SELECT id, name, email, password, role FROM login WHERE email = ?";
    db.query(sql, [email], async (err, data) => {
        if (err) {
            console.error('Gabim në databazë:', err);
            return res.status(500).json({ message: "Gabim i brendshëm i serverit." });
        }

        if (data.length === 0) {
            return res.status(401).json({ message: "Email ose fjalëkalim i pasaktë." });
        }

        const user = data[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email ose fjalëkalim i pasaktë." });
        }

        const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        return res.json({
            token,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            role: user.role,
            message: "Kyçja u krye me sukses!"
        });
    });
});

// 🔹 MERR TË GJITHË PËRDORUESIT
router.get("/v2/login", (req, res) => {
    db.query("SELECT id, name, email, role FROM login", (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send("Internal Server Error");
        }
        res.json(result);
    });
});

// 🔹 SHTO NJË PËRDORUES TË RI
router.post('/v1/login', async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, hashedPassword, role], (err, result) => {
            if (err) {
                console.error('Error during POST request:', err);
                return res.status(500).send('Error adding user');
            }

            const userId = result.insertId;
            const payload = { id: userId, name, email, role };
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

            res.status(201).json({
                message: 'User added successfully',
                token,
                userId,
                userName: name,
                userEmail: email,
                role
            });
        });
    } catch (error) {
        console.error("Bcrypt Error:", error);
        return res.status(500).json({ message: "Password hashing failed" });
    }
});

// 🔹 LOGOUT
router.post('/v1/logout', (req, res) => {
    // Clear the JWT token stored in the cookies
    res.clearCookie('token', { httpOnly: true, secure: true });  // Adjust secure flag based on your environment (use true for HTTPS)
  
    res.status(200).json({ message: 'Successfully logged out' });
});

// 🔹 FSHI NJË PËRDORUES
router.delete('/v1/login/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM login WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error during DELETE request:', err);
            return res.status(500).send('Error deleting user');
        }
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
