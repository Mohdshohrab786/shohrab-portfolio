const fs = require('fs');

const filePath = 'd:/xampp/htdocs/araweb/my-portfolio/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// The original section html
const oldSectionHtml = `<section class="bg-dark section-dark text-light pt-60 pb-60 border-top border-bottom border-white-op-1">
            <div class="container">
                <div class="row text-center g-4">
                    <div class="col-lg-3 col-6 wow fadeInRight" data-wow-delay=".2s">
                        <h2 class="fs-60 id-color mb-0">50<span class="fs-30 text-white">+</span></h2>
                        <span class="fs-14 text-uppercase letter-spacing-1">Projects Delivered</span>
                    </div>
                    <div class="col-lg-3 col-6 wow fadeInRight" data-wow-delay=".4s">
                        <h2 class="fs-60 id-color mb-0">3<span class="fs-30 text-white">+</span></h2>
                        <span class="fs-14 text-uppercase letter-spacing-1">Years Experience</span>
                    </div>
                    <div class="col-lg-3 col-6 wow fadeInRight" data-wow-delay=".6s">
                        <h2 class="fs-60 id-color mb-0">50<span class="fs-30 text-white">+</span></h2>
                        <span class="fs-14 text-uppercase letter-spacing-1">Happy Clients</span>
                    </div>
                    <div class="col-lg-3 col-6 wow fadeInRight" data-wow-delay=".8s">
                        <h2 class="fs-60 id-color mb-0">100<span class="fs-30 text-white">%</span></h2>
                        <span class="fs-14 text-uppercase letter-spacing-1">Job Success</span>
                    </div>
                </div>
            </div>
        </section>`;

// Let's build the new section
const newSectionHtml = `<section class="section-dark text-light pt-60 pb-60">
            <div class="container">
                <div class="stats-banner row text-center g-4 align-items-center">
                    <div class="col-lg-3 col-6 wow fadeInRight" data-wow-delay=".2s">
                        <h2 class="fs-60 mb-0">50<span class="fs-30">+</span></h2>
                        <span class="fs-14 text-uppercase letter-spacing-1">Projects Delivered</span>
                    </div>
                    <div class="col-lg-3 col-6 wow fadeInRight" data-wow-delay=".4s">
                        <h2 class="fs-60 mb-0">3<span class="fs-30">+</span></h2>
                        <span class="fs-14 text-uppercase letter-spacing-1">Years Experience</span>
                    </div>
                    <div class="col-lg-3 col-6 wow fadeInRight" data-wow-delay=".6s">
                        <h2 class="fs-60 mb-0">50<span class="fs-30">+</span></h2>
                        <span class="fs-14 text-uppercase letter-spacing-1">Happy Clients</span>
                    </div>
                    <div class="col-lg-3 col-6 wow fadeInRight" data-wow-delay=".8s">
                        <h2 class="fs-60 mb-0">100<span class="fs-30">%</span></h2>
                        <span class="fs-14 text-uppercase letter-spacing-1">Job Success</span>
                    </div>
                </div>
            </div>
        </section>`;

if (content.includes('Projects Delivered')) {
    // If the exact match fails due to spaces, we can use regex or substring
    if(content.includes(oldSectionHtml)) {
        content = content.replace(oldSectionHtml, newSectionHtml);
    } else {
        // More robust replacement
        const startMarker = '<section class="bg-dark section-dark text-light pt-60 pb-60 border-top border-bottom border-white-op-1">';
        const endMarker = 'Job Success</span>\n                    </div>\n                </div>\n            </div>\n        </section>';
        
        let startIdx = content.indexOf(startMarker);
        if(startIdx !== -1) {
            let endIdx = content.indexOf('</section>', startIdx) + '</section>'.length;
            content = content.substring(0, startIdx) + newSectionHtml + content.substring(endIdx);
        }
    }
}

const statsCSS = `
    <style>
        .stats-banner {
            background: radial-gradient(circle at 10% 100%, rgba(70, 44, 130, 0.6) 0%, transparent 60%), 
                        linear-gradient(90deg, #2b1b54 0%, #1f1b4a 40%, #151433 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 40px 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }
        .stats-banner h2 {
            color: #ffffff !important;
            font-weight: 700;
        }
        .stats-banner span.fs-30 {
            color: #ffffff !important;
            opacity: 0.8;
            margin-left: 2px;
        }
        .stats-banner .fs-14 {
            color: #d1d1e0;
            font-weight: 500;
            letter-spacing: 2px;
        }
    </style>
`;

if (!content.includes('.stats-banner')) {
    content = content.replace('</head>', statsCSS + '</head>');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Stats banner updated.');
