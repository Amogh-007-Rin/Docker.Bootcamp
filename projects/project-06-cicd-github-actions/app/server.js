const express = require('express');
const app = express();

app.get('/', (_req, res) => res.json({ message: 'Hello from Docker!' }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(3000, () => console.log('app on 3000'));
