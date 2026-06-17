const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/savings', require('./routes/savings'));
app.use('/api/budgets', require('./routes/budgets'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Finance Coach server running on port ${PORT}`));
