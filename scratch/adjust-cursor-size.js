const fs = require('fs');
const filePath = 'd:/xampp/htdocs/araweb/my-portfolio/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Replace hover widths and heights
content = content.replace(/circles\[0\]\.el\.style\.width = '60px';/g, "circles[0].el.style.width = '45px';");
content = content.replace(/circles\[0\]\.el\.style\.height = '60px';/g, "circles[0].el.style.height = '45px';");

// Make default a bit smaller too, just in case
// Replace 35px -> 30px
content = content.replace(/circles\[0\]\.el\.style\.width = '35px';/g, "circles[0].el.style.width = '30px';");
content = content.replace(/circles\[0\]\.el\.style\.height = '35px';/g, "circles[0].el.style.height = '30px';");

content = content.replace(/width: 35px;/g, "width: 30px;");
content = content.replace(/height: 35px;/g, "height: 30px;");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Hover size reduced.");
