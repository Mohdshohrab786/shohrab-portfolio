const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const sections = content.match(/<section id="([^"]+)"/g);
console.log(sections);
