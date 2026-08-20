const fs = require('fs');

const filePath = 'd:/xampp/htdocs/araweb/my-portfolio/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Remove the Bubble Cursor
const oldStart = '<!-- Bubble Cursor -->';
const oldEnd = '</script>';

if (content.includes(oldStart)) {
    const startIndex = content.indexOf(oldStart);
    const endIndex = content.indexOf(oldEnd, startIndex) + oldEnd.length;
    content = content.substring(0, startIndex) + content.substring(endIndex);
}

// Prepare Emoji Cursor code
const emojiCursorCode = `
    <!-- Emoji Cursor -->
    <script>
        function emojiCursor(options) {
            let hasWrapperEl = options && options.element;
            let element = hasWrapperEl || document.body;
            // Emojis array for the trail
            let emojis = options && options.emojis ? options.emojis : ["🚀", "💻", "🔥", "✨", "☕", "👨‍💻", "🎨"];
            
            let width = window.innerWidth;
            let height = window.innerHeight;
            let cursor = { x: width / 2, y: width / 2 };
            let particles = [];
            let canvas, context, animationFrame;

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

            prefersReducedMotion.onchange = () => {
                if (prefersReducedMotion.matches) {
                    destroy();
                } else {
                    init();
                }
            };

            function init() {
                if (prefersReducedMotion.matches) {
                    return false;
                }

                canvas = document.createElement("canvas");
                context = canvas.getContext("2d");

                canvas.style.top = "0px";
                canvas.style.left = "0px";
                canvas.style.pointerEvents = "none";
                canvas.style.zIndex = options && options.zIndex ? options.zIndex : "9999999999";

                if (hasWrapperEl) {
                    canvas.style.position = "absolute";
                    element.appendChild(canvas);
                    canvas.width = element.clientWidth;
                    canvas.height = element.clientHeight;
                } else {
                    canvas.style.position = "fixed";
                    document.body.appendChild(canvas);
                    canvas.width = width;
                    canvas.height = height;
                }

                bindEvents();
                loop();
            }

            function bindEvents() {
                element.addEventListener("mousemove", onMouseMove);
                element.addEventListener("touchmove", onTouchMove, { passive: true });
                element.addEventListener("touchstart", onTouchMove, { passive: true });
                window.addEventListener("resize", onWindowResize);
            }

            function onWindowResize(e) {
                width = window.innerWidth;
                height = window.innerHeight;

                if (hasWrapperEl) {
                    canvas.width = element.clientWidth;
                    canvas.height = element.clientHeight;
                } else {
                    canvas.width = width;
                    canvas.height = height;
                }
            }

            function onTouchMove(e) {
                if (e.touches.length > 0) {
                    for (let i = 0; i < e.touches.length; i++) {
                        addParticle(e.touches[i].clientX, e.touches[i].clientY);
                    }
                }
            }

            function onMouseMove(e) {
                if (hasWrapperEl) {
                    const boundingRect = element.getBoundingClientRect();
                    cursor.x = e.clientX - boundingRect.left;
                    cursor.y = e.clientY - boundingRect.top;
                } else {
                    cursor.x = e.clientX;
                    cursor.y = e.clientY;
                }

                // Throttle emoji creation slightly so it's not too cluttered
                if (Math.random() < 0.6) {
                    addParticle(cursor.x, cursor.y);
                }
            }

            function addParticle(x, y) {
                particles.push(new Particle(x, y));
            }

            function updateParticles() {
                if (particles.length == 0) {
                    return;
                }

                context.clearRect(0, 0, width, height);

                for (let i = 0; i < particles.length; i++) {
                    particles[i].update(context);
                }

                for (let i = particles.length - 1; i >= 0; i--) {
                    if (particles[i].lifeSpan < 0) {
                        particles.splice(i, 1);
                    }
                }

                if (particles.length == 0) {
                    context.clearRect(0, 0, width, height);
                }
            }

            function loop() {
                updateParticles();
                animationFrame = requestAnimationFrame(loop);
            }

            function destroy() {
                canvas.remove();
                cancelAnimationFrame(animationFrame);
                element.removeEventListener("mousemove", onMouseMove);
                element.removeEventListener("touchmove", onTouchMove);
                element.removeEventListener("touchstart", onTouchMove);
                window.addEventListener("resize", onWindowResize);
            }

            function Particle(x, y) {
                const lifeSpan = Math.floor(Math.random() * 40 + 40);
                this.initialLifeSpan = lifeSpan;
                this.lifeSpan = lifeSpan;
                // Emojis float up and slightly side to side
                this.velocity = {
                    x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 2),
                    y: -1 + Math.random() * -2, 
                };
                this.position = { x: x, y: y };
                this.emoji = emojis[Math.floor(Math.random() * emojis.length)];

                this.update = function (context) {
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    this.lifeSpan--;

                    const scale = Math.max(0, this.lifeSpan / this.initialLifeSpan);

                    context.globalAlpha = scale; // Fade out
                    context.font = "24px Arial"; // Size of emoji
                    context.fillText(this.emoji, this.position.x, this.position.y);
                    context.globalAlpha = 1;
                };
            }

            init();

            return {
                destroy: destroy
            }
        }

        // Initialize Emoji Cursor on Load
        document.addEventListener("DOMContentLoaded", () => {
            if (!window.matchMedia("(pointer: coarse)").matches) {
                // You can change emojis by passing options: { emojis: ["🚀", "🔥"] }
                emojiCursor({ emojis: ["🚀", "💻", "✨", "☕", "👨‍💻", "🎨", "🌟"] });
            }
        });
    </script>
`;

content = content.replace('</body>', emojiCursorCode + '\n</body>');
fs.writeFileSync(filePath, content, 'utf8');
console.log("Emoji Cursor injected successfully.");
