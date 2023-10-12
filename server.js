const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
const HTML_DIR = __dirname + '/public/'
app.use(express.static(HTML_DIR))
app.use(bodyParser.json());

let entries = [];

// Load the entries from the JSON file when the server starts
function loadEntries() {
  try {
    const data = fs.readFileSync('entries.json', 'utf-8');
    console.log(`Loaded json`);
    entries = JSON.parse(data);
  } catch (error) {
    console.error('Error reading entries:', error);
  }
}

// Save the entries to the JSON file
function saveEntries() {
  fs.writeFileSync('entries.json', JSON.stringify(entries, null, 2));
}

// Load entries on server startup
loadEntries();



app.get('/entries', (req, res) => {
  console.log(`Get Entires`);
  res.json(entries);
});

app.post('/entries', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }

  entries.push({ name, age });

  // Save the updated entries to the JSON file
  saveEntries();

  res.json({ message: 'Entry added successfully' });
  console.log(`Push Entires ${name} and ${age}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
