const fs = require('fs');

const filePath = 'd:/xampp/htdocs/araweb/my-portfolio/index.html';
let content = fs.readFileSync(filePath, 'utf8');

const cursorCode = `
    <!-- Custom Liquid Cursor -->
    <style>
        body, html {
            cursor: none;
        }
        a, button, .hover, input, textarea, .project-card {
            cursor: none !important;
        }
        .liquid-cursor {
            position: fixed;
            top: 0;
            left: 0;
            width: 15px;
            height: 15px;
            background-color: #fff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            mix-blend-mode: difference;
            transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
            will-change: transform;
        }
        .liquid-cursor-follower {
            position: fixed;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            background-color: transparent;
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99998;
            transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
            will-change: transform;
        }
        .liquid-cursor.hovered {
            width: 60px;
            height: 60px;
            background-color: rgba(255, 255, 255, 1);
        }
        .liquid-cursor-follower.hovered {
            width: 80px;
            height: 80px;
            border-color: rgba(255, 255, 255, 0);
        }
    </style>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Only add on non-touch devices
            if (window.matchMedia("(pointer: coarse)").matches) {
                document.body.style.cursor = 'auto';
                return;
            }

            const cursor = document.createElement("div");
            cursor.classList.add("liquid-cursor");
            document.body.appendChild(cursor);

            const follower = document.createElement("div");
            follower.classList.add("liquid-cursor-follower");
            document.body.appendChild(follower);

            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let cursorX = mouseX;
            let cursorY = mouseY;
            let followerX = mouseX;
            let followerY = mouseY;

            window.addEventListener("mousemove", (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animate() {
                cursorX += (mouseX - cursorX) * 0.5;
                cursorY += (mouseY - cursorY) * 0.5;
                cursor.style.transform = \`translate(calc(\${cursorX}px - 50%), calc(\${cursorY}px - 50%))\`;

                followerX += (mouseX - followerX) * 0.15;
                followerY += (mouseY - followerY) * 0.15;
                follower.style.transform = \`translate(calc(\${followerX}px - 50%), calc(\${followerY}px - 50%))\`;

                requestAnimationFrame(animate);
            }
            animate();

            const attachHoverEvents = () => {
                const interactables = document.querySelectorAll("a, button, .hover, input, textarea, .project-card");
                interactables.forEach(el => {
                    // avoid attaching multiple times
                    if(!el.dataset.cursorAttached) {
                        el.dataset.cursorAttached = "true";
                        el.addEventListener("mouseenter", () => {
                            cursor.classList.add("hovered");
                            follower.classList.add("hovered");
                        });
                        el.addEventListener("mouseleave", () => {
                            cursor.classList.remove("hovered");
                            follower.classList.remove("hovered");
                        });
                    }
                });
            };
            
            attachHoverEvents();
            
            // Re-attach on dynamic changes if needed
            const observer = new MutationObserver(attachHoverEvents);
            observer.observe(document.body, { childList: true, subtree: true });
        });
    </script>
`;

if (!content.includes('liquid-cursor')) {
    content = content.replace('</body>', cursorCode + '\n</body>');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Cursor code injected successfully.");
} else {
    console.log("Cursor code already exists.");
}
