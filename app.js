const express = require('express');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

app.use(express.json());
app.use('/api/items', itemRoutes);
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));