const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/questions', require('./routes/questions'));
app.use('/api/checkpoints', require('./routes/checkpoints'));
app.use('/api/responses', require('./routes/responses'));
app.use('/api/users', require('./routes/users'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AWFM Questionnaire API is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
