const fs = require('fs');

const filePath = 'd:/xampp/htdocs/araweb/my-portfolio/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// The image HTML inside About section
const oldImageHtml = '<img src="images/misc/c1.webp" class="w-100 rounded-2" alt="Shohrab">';
const newImageHtml = '<img src="images/misc/c1.webp" class="w-100 rounded-2 rotate-animation" alt="Shohrab">';

if (content.includes(oldImageHtml)) {
    content = content.replace(oldImageHtml, newImageHtml);
} else {
    // try a more generic replace if it got modified
    content = content.replace(/<img src="images\/misc\/c1\.webp" class="w-100([^"]*)"([^>]*)>/, '<img src="images/misc/c1.webp" class="w-100$1 rotate-animation"$2>');
}

// Check if style already exists
if (!content.includes('.rotate-animation')) {
    const styleToInject = `
    <style>
        .rotate-animation {
            animation: spin 15s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    </style>
    `;
    // Add right before </head>
    content = content.replace('</head>', styleToInject + '</head>');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Image rotation added.');
