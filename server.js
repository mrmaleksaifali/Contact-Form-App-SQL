const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 4000;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'nodeuser',
  password: 'StrongPassword123!',
  database: 'demo_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// POST form
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO contacts (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) throw err;
    res.send('Contact saved!');
  });
});

// GET data
app.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://13.204.45.180:${PORT}`);
});
