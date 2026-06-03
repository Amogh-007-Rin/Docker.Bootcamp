const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Node Dockerfile demo\n');
});

app.listen(3000, '0.0.0.0');
