const db = require('../models/db');

exports.getAllItems = (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error fetching items' });
    } else {
      res.json(rows);
    }
  });
};

exports.createItem = (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  const query = `INSERT INTO items (name, description) VALUES (?, ?)`;
  db.run(query, [name, description], function (err) {
    if (err) {
      res.status(500).json({ success: false, message: 'Error adding item' });
    } else {
      res.status(201).json({ success: true, message: 'Item added', id: this.lastID });
    }
  });
};