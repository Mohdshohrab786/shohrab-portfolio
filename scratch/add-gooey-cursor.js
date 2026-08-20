const fs = require('fs');

const filePath = 'd:/xampp/htdocs/araweb/my-portfolio/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Remove previous cursor if exists
const oldStart = '<!-- Custom Liquid Cursor -->';
const oldEnd = '</script>';

if (content.includes(oldStart)) {
    const startIndex = content.indexOf(oldStart);
    // Find the next </script> after oldStart
    const endIndex = content.indexOf(oldEnd, startIndex) + oldEnd.length;
    content = content.substring(0, startIndex) + content.substring(endIndex);
}

// Add the new True Liquid Gooey Cursor
const newCursorCode = `
    <!-- True Liquid Gooey Cursor -->
    <svg xmlns="http://www.w3.org/2000/svg" class="goo-filter" version="1.1" width="0" height="0" style="position: absolute; display: none;">
        <defs>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
        </defs>
    </svg>
    <style>
        body, html {
            cursor: none;
        }
        a, button, .hover, input, textarea, .project-card {
            cursor: none !important;
        }
        .goo-cursor-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 99999;
            filter: url('#goo');
        }
        .goo-circle {
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            background: #0dcaf0; /* Using your theme's info color */
            border-radius: 50%;
            transform: translate(-50%, -50%);
            will-change: left, top, transform;
        }
        /* Make the first circle distinct or larger if desired */
        .goo-circle:nth-child(1) {
            background: #ffffff;
            width: 35px;
            height: 35px;
        }
    </style>
    <div class="goo-cursor-container"></div>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (window.matchMedia("(pointer: coarse)").matches) {
                document.body.style.cursor = 'auto';
                return; // Disable on touch devices
            }

            const container = document.querySelector('.goo-cursor-container');
            const circles = [];
            const numCircles = 12; // Length of the liquid trail

            // Create circles
            for(let i = 0; i < numCircles; i++) {
                const el = document.createElement('div');
                el.className = 'goo-circle';
                // Scale down as they go further back in the trail
                const scale = (numCircles - i) / numCircles;
                el.style.transform = \`translate(-50%, -50%) scale(\${scale})\`;
                container.appendChild(el);
                circles.push({ el: el, x: window.innerWidth / 2, y: window.innerHeight / 2 });
            }

            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;

            window.addEventListener('mousemove', e => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateGoo() {
                let x = mouseX;
                let y = mouseY;

                circles.forEach((circle, index) => {
                    // Adjust speed for a liquid feel. 
                    // First circle moves very fast to cursor, others drag behind.
                    const speed = index === 0 ? 0.5 : 0.3; 
                    
                    circle.x += (x - circle.x) * speed;
                    circle.y += (y - circle.y) * speed;
                    
                    circle.el.style.left = circle.x + 'px';
                    circle.el.style.top = circle.y + 'px';
                    
                    // The next circle targets the position of the current circle
                    x = circle.x;
                    y = circle.y;
                });
                requestAnimationFrame(animateGoo);
            }
            animateGoo();
            
            // Hover effect on links
            const attachHoverEvents = () => {
                const interactables = document.querySelectorAll("a, button, .hover, input, textarea, .project-card");
                interactables.forEach(el => {
                    if(!el.dataset.gooAttached) {
                        el.dataset.gooAttached = "true";
                        el.addEventListener("mouseenter", () => {
                            circles[0].el.style.width = '60px';
                            circles[0].el.style.height = '60px';
                            circles[0].el.style.background = '#ffffff';
                        });
                        el.addEventListener("mouseleave", () => {
                            circles[0].el.style.width = '35px';
                            circles[0].el.style.height = '35px';
                            circles[0].el.style.background = '#ffffff';
                        });
                    }
                });
            };
            
            attachHoverEvents();
            const observer = new MutationObserver(attachHoverEvents);
            observer.observe(document.body, { childList: true, subtree: true });
        });
    </script>
`;

content = content.replace('</body>', newCursorCode + '\n</body>');
fs.writeFileSync(filePath, content, 'utf8');
console.log("New Gooey Cursor injected successfully.");
