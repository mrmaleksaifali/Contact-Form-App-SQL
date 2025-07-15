const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 4000;
 
// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'demo_db'
});
 
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ MySQL Connected!');
});
 
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
 
// POST form data
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO contacts (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error('❌ Error saving contact:', err);
      return res.status(500).send('Failed to save contact.');
    }
    res.send('✅ Contact saved!');
  });
});
 
// GET all contacts
app.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) {
      console.error('❌ Error fetching contacts:', err);
      return res.status(500).send('Failed to retrieve contacts.');
    }
    res.json(results);
  });
});
 
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
