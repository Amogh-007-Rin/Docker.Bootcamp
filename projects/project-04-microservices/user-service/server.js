const express = require('express');
express().get('/', (_q, r) => r.json([{ id: 1, name: 'Ada' }])).listen(3001, () => console.log('users 3001'));
