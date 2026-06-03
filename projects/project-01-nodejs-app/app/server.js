const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const app = express();
app.use(express.json());

app.get('/health', async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ status: 'ok' });
});

app.get('/users', async (_req, res) => {
  const { rows } = await pool.query('SELECT id, name FROM users ORDER BY id');
  res.json(rows);
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  const { rows } = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
  res.status(201).json(rows[0]);
});

async function init() {
  await pool.query('CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, name text NOT NULL)');
  app.listen(3000, () => console.log('api on 3000'));
}
init().catch((e) => { console.error(e); process.exit(1); });
