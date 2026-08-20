const fs = require('fs');
const filePath = 'd:/xampp/htdocs/araweb/my-portfolio/index.html';
let content = fs.readFileSync(filePath, 'utf8');

const newMenu = `
                                    <ul id="mainmenu">
                                        <li><a class="menu-item active" href="#section-hero">Home</a></li>
                                        <li><a class="menu-item" href="#section-about">About</a></li>
                                        <li><a class="menu-item" href="#section-resume">Experience</a></li>
                                        <li><a class="menu-item" href="#section-skills">Skills</a></li>
                                        <li><a class="menu-item" href="#section-projects">Projects</a></li>
                                        <li><a class="menu-item" href="#section-resume">Education</a></li>
                                    </ul>`;

// Regex to find the <ul id="mainmenu"> block
const menuRegex = /<ul id="mainmenu">[\s\S]*?<\/ul>/;

content = content.replace(menuRegex, newMenu.trim());

fs.writeFileSync(filePath, content, 'utf8');
console.log('Menu updated');
