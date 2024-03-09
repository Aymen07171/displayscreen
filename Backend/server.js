const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();

const upload = multer({ dest: 'uploads/' });

const app = express();

// Improved error handling
const handleError = (err, res) => {
  console.error(err);
  res.status(500).send(err.message || 'Internal server error');
};

// Store database path in environment variable
const dbPath = process.env.DB_PATH || '../Database/displayscreen.db';

// Connection pool for efficient database access
const pool = new sqlite3.Database.Pool(dbPath);

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filename = req.file.filename;
    const filetype = req.body.filetype; // Assuming this is sent from the frontend
    const path = `uploads/${filename}`;

    // Sanitize user input (not shown here)

    // Establish database connection from pool
    const db = await pool.promise();

    // Prepare and execute SQL statement (adjust table and column names if needed)
    const stmt = await db.prepare('INSERT INTO Media (Name, Type, Path) VALUES (?, ?, ?)');
    await stmt.run(filename, filetype, path);

    res.status(200).send('Upload successful');
  } catch (err) {
    handleError(err, res);
  } finally {
    // Release connection back to pool
    await db.close();
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
