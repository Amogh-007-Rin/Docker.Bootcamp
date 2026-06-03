const express = require('express');
const Redis = require('ioredis');
const { Pool } = require('pg');

const app = express();
const redis = new Redis(process.env.REDIS_URL);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get('/health', async (_req, res) => {
  await redis.ping();
  await pool.query('SELECT 1');
  res.json({ status: 'ok' });
});

app.get('/', async (_req, res) => {
  const hits = await redis.incr('hits');
  res.json({ message: 'Lab 06 full stack', hits });
});

app.listen(3000, () => console.log('listening on 3000'));
