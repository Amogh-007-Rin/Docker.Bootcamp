const express = require('express');
express().get('/', (_q, r) => r.send('lab07')).listen(3000);
