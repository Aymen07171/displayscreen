    const express = require('express');
    const sqlite3 = require('sqlite3').verbose();
    const multer = require('multer');
    const path = require('path');

    const app = express();
    const PORT = 5000;

    // Connect to SQLite database
    const db = new sqlite3.Database('../Backend/displayscreen.db'); // Corrected database path

    // Multer configuration for handling file uploads
    const storage = multer.diskStorage({
    destination: './Backend/uploads', // Corrected destination path for uploads
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
    });

    const upload = multer({ storage });

    // API endpoint to upload image
    app.post('/upload', upload.single('image'), (req, res) => {
    const { filename, path } = req.file;

    // Insert uploaded image into the database
    db.run('INSERT INTO images (filename, path) VALUES (?, ?)', [filename, path], function(err) {
        if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        res.status(200).json({ message: 'Image uploaded successfully' });
        }
    });
    });

    // Endpoint to fetch the last uploaded image from the database
    app.get('/last-image', (req, res) => {
    db.get('SELECT * FROM images ORDER BY id DESC LIMIT 1', (err, row) => {
        if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        res.json(row);
        }
    });
    });

// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
