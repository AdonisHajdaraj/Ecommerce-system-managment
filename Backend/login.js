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
        const checkEmailSql = "SELECT * FROM login WHERE email = ?";
        db.query(checkEmailSql, [email], async (err, results) => {
            if (err) {
                console.error('Gabim në databazë gjatë kontrollit të email:', err);
                return res.status(500).json({ message: "Gabim në server gjatë regjistrimit." });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: "Ky email është marrë tashmë. Përdor një tjetër." });
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const insertSql = "INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, ?)";

                db.query(insertSql, [name, email, hashedPassword, role], (insertErr, result) => {
                    if (insertErr) {
                        console.error('Gabim në databazë gjatë regjistrimit:', insertErr);
                        return res.status(500).json({ message: "Gabim gjatë regjistrimit." });
                    }

                    const userId = result.insertId;
                    const payload = { id: userId, name, email, role };

                    // Gjenero access token me 1h jetë
                    const token = jwt.sign(payload, secretKey, { expiresIn: '15s' });

                    // Gjenero refresh token me 7 ditë jetë
                    const refreshToken = jwt.sign(payload, secretKey, { expiresIn: '7d' });

                    // Ruaj refresh token në DB
                    const updateRefreshTokenSql = "UPDATE login SET refresh_token = ? WHERE id = ?";
                    db.query(updateRefreshTokenSql, [refreshToken, userId], (updateErr) => {
                        if (updateErr) {
                            console.error('Gabim gjatë ruajtjes së refresh token:', updateErr);
                            return res.status(500).json({ message: "Gabim në server." });
                        }

                        return res.status(201).json({
                            message: "Regjistrimi u krye me sukses",
                            token,
                            refreshToken,
                            userId,
                            userName: name,
                            userEmail: email,
                            role
                        });
                    });
                });
            } catch (hashError) {
                console.error("Gabim me bcrypt:", hashError);
                return res.status(500).json({ message: "Gabim gjatë enkriptimit të fjalëkalimit." });
            }
        });
    } catch (error) {
        console.error("Gabim i papritur:", error);
        return res.status(500).json({ message: "Gabim i papritur në server." });
    }
});

// 🔹 LOGIN
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

        // Gjenero access token me 1h jetë
        const token = jwt.sign(payload, secretKey, { expiresIn: '15s' })

        // Gjenero refresh token me 7 ditë jetë
        const refreshToken = jwt.sign(payload, secretKey, { expiresIn: '7d' });

        // Ruaj refresh token në DB
        const updateSql = "UPDATE login SET refresh_token = ? WHERE id = ?";
        db.query(updateSql, [refreshToken, user.id], (updateErr) => {
            if (updateErr) {
                console.error('Gabim gjatë ruajtjes së refresh token:', updateErr);
                return res.status(500).json({ message: "Gabim në server." });
            }

            return res.json({
                token,
                refreshToken,
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                role: user.role,
                message: "Kyçja u krye me sukses!"
            });
        });
    });
});

// 🔹 REFRESH TOKEN
router.post('/token/refresh', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token mungon." });

    const sql = "SELECT * FROM login WHERE refresh_token = ?";
    db.query(sql, [refreshToken], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gabim në server." });
        }
        if (results.length === 0) {
            return res.status(403).json({ message: "Refresh token i pavlefshëm." });
        }

        jwt.verify(refreshToken, secretKey, (verifyErr, user) => {
            if (verifyErr) {
                return res.status(403).json({ message: "Refresh token i pavlefshëm." });
            }

            const payload = { id: user.id, name: user.name, email: user.email, role: user.role };

            // Gjenero access token të ri me 1h jetë
            const newAccessToken = jwt.sign(payload, secretKey, { expiresIn: '15s' });

            res.json({ token: newAccessToken, role: user.role }); // dërgo tokenin dhe rolin në front
        });
    });
});



// BACKEND (Node.js/Express)
router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: "Refresh token mungon." });

  const sql = "UPDATE login SET refresh_token = NULL WHERE refresh_token = ?";
  db.query(sql, [refreshToken], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gabim në server." });
    }
    return res.status(200).json({ message: "Logout u krye me sukses." });
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
            const token = jwt.sign(payload, secretKey, { expiresIn: '15s' });

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
