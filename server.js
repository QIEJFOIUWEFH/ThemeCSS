const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './leaderboard.json';

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '{}');
}

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.post('/update-rolls', (req, res) => {
  const { username, rolls } = req.body;
  if (!username || typeof rolls !== 'number') return res.status(400).send('Invalid data');

  const data = readData();
  data[username] = rolls;
  writeData(data);
  res.send({ success: true });
});

app.get('/leaderboard', (req, res) => {
  const data = readData();
  const sorted = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .map(([username, rolls]) => ({ username, rolls }))
    .slice(0, 10);
  res.json(sorted);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
