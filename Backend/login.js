const express = require('express');
const router = express.Router();
const db = require('./db'); // konfiguro db sipas MySQL
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const secretKey = 'my_secret_key';


router.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());


passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    const sql = "SELECT * FROM login WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) return done(err);
        if (!results || results.length === 0) return done(null, false);
        done(null, results[0]);
    });
});


passport.use(new GoogleStrategy({
    clientID: '309724576731-cgcstbruf13s13lcglhob0eck0c1fglf.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3002/auth/google/callback'
},  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const name = profile.displayName;

    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) return done(err);

      if (results.length > 0) {
        return done(null, results[0]);
      } else {
        const dummyPassword = await bcrypt.hash('google_oauth_dummy_password', 10);

        const insertSql = "INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(insertSql, [name, email, dummyPassword, 'user'], (insertErr, insertRes) => {
          if (insertErr) return done(insertErr);

          const newUser = { id: insertRes.insertId, name, email, role: 'user' };
          return done(null, newUser);
        });
      }
    });
  }
));


router.post('/v1/register', async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme." });
    }

    const checkEmailSql = "SELECT * FROM login WHERE email = ?";
    db.query(checkEmailSql, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Gabim në server gjatë regjistrimit." });
        if (results.length > 0) {
            return res.status(400).json({ message: "Ky email është marrë tashmë. Përdor një tjetër." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertSql = "INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(insertSql, [name, email, hashedPassword, role], (insertErr, result) => {
            if (insertErr) return res.status(500).json({ message: "Gabim gjatë regjistrimit." });

            const userId = result.insertId;
            const payload = { id: userId, name, email, role };
            const token = jwt.sign(payload, secretKey, { expiresIn: '15m' });
            const refreshToken = jwt.sign(payload, secretKey, { expiresIn: '7d' });

            const updateRefreshTokenSql = "UPDATE login SET refresh_token = ? WHERE id = ?";
            db.query(updateRefreshTokenSql, [refreshToken, userId], (updateErr) => {
                if (updateErr) return res.status(500).json({ message: "Gabim në server." });

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
    });
});

// LOGIN
router.post('/v1/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email dhe fjalëkalimi janë të detyrueshëm." });
    }

    const sql = "SELECT id, name, email, password, role FROM login WHERE email = ?";
    db.query(sql, [email], async (err, data) => {
        if (err) return res.status(500).json({ message: "Gabim i brendshëm i serverit." });
        if (data.length === 0) return res.status(401).json({ message: "Email ose fjalëkalim i pasaktë." });

        const user = data[0];
       
        if (!user.password) {
            return res.status(401).json({ message: "Ky email është i regjistruar përmes Google. Përdor Google për kyçje." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Email ose fjalëkalim i pasaktë." });

        const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
        const token = jwt.sign(payload, secretKey, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, secretKey, { expiresIn: '7d' });

        const updateSql = "UPDATE login SET refresh_token = ? WHERE id = ?";
        db.query(updateSql, [refreshToken, user.id], (updateErr) => {
            if (updateErr) return res.status(500).json({ message: "Gabim në server." });

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

// REFRESH TOKEN
router.post('/token/refresh', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token mungon." });

    const sql = "SELECT * FROM login WHERE refresh_token = ?";
    db.query(sql, [refreshToken], (err, results) => {
        if (err) return res.status(500).json({ message: "Gabim në server." });
        if (results.length === 0) return res.status(403).json({ message: "Refresh token i pavlefshëm." });

        jwt.verify(refreshToken, secretKey, (verifyErr, user) => {
            if (verifyErr) return res.status(403).json({ message: "Refresh token i pavlefshëm." });

            const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
            const newAccessToken = jwt.sign(payload, secretKey, { expiresIn: '15m' });

            res.json({ token: newAccessToken, role: user.role });
        });
    });
});

// LOGOUT
router.post('/logout', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token mungon." });

    const sql = "UPDATE login SET refresh_token = NULL WHERE refresh_token = ?";
    db.query(sql, [refreshToken], (err) => {
        if (err) return res.status(500).json({ message: "Gabim në server." });
        res.status(200).json({ message: "Logout u krye me sukses." });
    });
});

// MERR PËRDORUESIT
router.get("/v2/login", (req, res) => {
    db.query("SELECT id, name, email, role FROM login", (err, result) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.json(result);
    });
});

// SHTO PËRDORUES
router.post('/v1/login', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, hashedPassword, role], (err, result) => {
            if (err) return res.status(500).send('Gabim gjatë shtimit të përdoruesit');

            const userId = result.insertId;
            const payload = { id: userId, name, email, role };
            const token = jwt.sign(payload, secretKey, { expiresIn: '15m' });

            res.status(201).json({
                message: 'Përdoruesi u shtua me sukses',
                token,
                userId,
                userName: name,
                userEmail: email,
                role
            });
        });
    } catch (error) {
        return res.status(500).json({ message: "Dështoi krijimi i fjalëkalimit" });
    }
});

// FSHI PËRDORUES
router.delete('/v1/login/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM login WHERE id = ?';

    db.query(query, [id], (err) => {
        if (err) return res.status(500).send('Gabim gjatë fshirjes së përdoruesit');
        res.json({ message: 'Përdoruesi u fshi me sukses' });
    });
});

// UPDATE PËRDORUES
router.put('/v1/login/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme." });
    }

    const query = 'UPDATE login SET name = ?, email = ?, role = ? WHERE id = ?';
    db.query(query, [name, email, role, id], (err) => {
        if (err) return res.status(500).send('Gabim gjatë përditësimit të përdoruesit');
        res.json({ message: 'Përdoruesi u përditësua me sukses' });
    });
});

// GOOGLE AUTH ROUTES
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failure' }),
  (req, res) => {
    // ...
    const user = req.user;
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    try {
      const token = jwt.sign(payload, secretKey, { expiresIn: '15m' });
      const refreshToken = jwt.sign(payload, secretKey, { expiresIn: '7d' });

      const updateSql = "UPDATE login SET refresh_token = ? WHERE id = ?";
      db.query(updateSql, [refreshToken, user.id], (err) => {
        if (err) {
          console.error('Gabim gjatë ruajtjes së refresh token:', err);
          return res.redirect('/login-failure');
        }

        let redirectBaseUrl;
        if (user.role === 'admin') {
          redirectBaseUrl = 'http://localhost:5173/dashboard';
        } else {
          redirectBaseUrl = 'http://localhost:5173/user-dashboard';
        }

        const redirectUrl = `${redirectBaseUrl}?token=${token}&refreshToken=${refreshToken}&userId=${user.id}&userName=${encodeURIComponent(user.name)}&userEmail=${encodeURIComponent(user.email)}&role=${user.role}`;

        console.log('Redirect URL:', redirectUrl);
        return res.redirect(redirectUrl);
      });
    } catch (error) {
      console.error('Gabim në JWT ose callback:', error);
      return res.redirect('/login-failure');
    }
  }
);


router.get('/login-failure', (req, res) => {
    res.status(401).send('Dështoi kyçja me Google. Provo përsëri.');
});

module.exports = router;
