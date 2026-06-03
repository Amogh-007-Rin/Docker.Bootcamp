const fs = require('fs');
const api = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const html = `<!DOCTYPE html><html><body><h1>Docker Mastery React Build</h1><p>API: ${api}</p></body></html>`;
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('built dist/index.html');
