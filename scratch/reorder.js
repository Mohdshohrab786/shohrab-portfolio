const fs = require('fs');

const filePath = 'd:/xampp/htdocs/araweb/my-portfolio/index.html';
const content = fs.readFileSync(filePath, 'utf8');

const startStr = '<div class="row g-3 text-center wow fadeInUp">';
const startIdx = content.indexOf(startStr);
const endStr = '</section>';
const endIdx = content.indexOf(endStr, startIdx);

const sectionContent = content.substring(startIdx, endIdx);
const blockDelimiter = '<div class="col-lg-3 col-md-4 col-sm-6 mb-3">';
const parts = sectionContent.split(blockDelimiter);

const header = parts[0];
const blocks = parts.slice(1).map(b => blockDelimiter + b);

const order = [
    "Sunroop",
    "Second Sight (Health)",
    "Shahi Store",
    "Indian Public Schools",
    "Karabath",
    "Sarvottam",
    "Made in Afghanistan",
    "Shaheen Public School",
    "Ananta Ysela",
    "Uffbyisha",
    "SecondSight Education",
    "SecondSight Medicine",
    "Kisan tools"
];

function getTitle(block) {
    const match = block.match(/<h5[^>]*>(.*?)<\/h5>/);
    if (match) {
        return match[1].trim();
    }
    return "";
}

const topBlocks = [];
const otherBlocks = [];
const usedIndices = new Set();

for (const reqTitle of order) {
    const reqNorm = reqTitle.toLowerCase().replace(/ /g, '');
    let found = false;
    for (let i = 0; i < blocks.length; i++) {
        if (usedIndices.has(i)) continue;
        const title = getTitle(blocks[i]);
        const titleNorm = title.toLowerCase().replace(/ /g, '');
        if (titleNorm.includes(reqNorm) || reqNorm.includes(titleNorm)) {
            topBlocks.push(blocks[i]);
            usedIndices.add(i);
            found = true;
            break;
        }
    }
    if (!found) {
        console.log("Not found:", reqTitle);
    }
}

for (let i = 0; i < blocks.length; i++) {
    if (!usedIndices.has(i)) {
        otherBlocks.push(blocks[i]);
    }
}

const newSectionContent = header + topBlocks.join('') + otherBlocks.join('');
const newContent = content.substring(0, startIdx) + newSectionContent + content.substring(endIdx);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Done rewriting index.html");
