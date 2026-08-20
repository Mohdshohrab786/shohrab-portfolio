const fs = require('fs');

const filePath = 'd:/xampp/htdocs/araweb/my-portfolio/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Remove the old Gooey Cursor
const oldStart = '<!-- True Liquid Gooey Cursor -->';
const oldEnd = '</script>';

if (content.includes(oldStart)) {
    const startIndex = content.indexOf(oldStart);
    const endIndex = content.indexOf(oldEnd, startIndex) + oldEnd.length;
    content = content.substring(0, startIndex) + content.substring(endIndex);
}

// Prepare the new Bubble Cursor code
const bubbleCursorCode = `
    <!-- Bubble Cursor -->
    <script>
        function bubbleCursor(options) {
            let hasWrapperEl = options && options.element;
            let element = hasWrapperEl || document.body;
            // Changed colors to match your theme (info color)
            let fillColor = options && options.fillColor ? options.fillColor : "rgba(13, 202, 240, 0.2)";
            let strokeColor = options && options.strokeColor ? options.strokeColor : "#0dcaf0";
            
            let width = window.innerWidth;
            let height = window.innerHeight;
            let cursor = { x: width / 2, y: width / 2 };
            let particles = [];
            let canvas, context, animationFrame;
            let canvImages = [];

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
                        addParticle(
                            e.touches[i].clientX,
                            e.touches[i].clientY,
                            canvImages[Math.floor(Math.random() * canvImages.length)]
                        );
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

                addParticle(cursor.x, cursor.y);
            }

            function addParticle(x, y, img) {
                particles.push(new Particle(x, y, img));
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

            function Particle(x, y, canvasItem) {
                const lifeSpan = Math.floor(Math.random() * 60 + 60);
                this.initialLifeSpan = lifeSpan;
                this.lifeSpan = lifeSpan;
                this.velocity = {
                    x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
                    y: -0.4 + Math.random() * -1,
                };
                this.position = { x: x, y: y };
                this.canv = canvasItem;
                this.baseDimension = 4;

                this.update = function (context) {
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
                    this.velocity.y -= Math.random() / 600;
                    this.lifeSpan--;

                    const scale = 0.2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;

                    context.fillStyle = fillColor;
                    context.strokeStyle = strokeColor;
                    context.beginPath();
                    context.arc(
                        this.position.x - (this.baseDimension / 2) * scale,
                        this.position.y - this.baseDimension / 2,
                        this.baseDimension * scale,
                        0,
                        2 * Math.PI
                    );
                    context.stroke();
                    context.fill();
                    context.closePath();
                };
            }

            init();

            return {
                destroy: destroy
            }
        }

        // Initialize Bubble Cursor on Load
        document.addEventListener("DOMContentLoaded", () => {
            if (!window.matchMedia("(pointer: coarse)").matches) {
                bubbleCursor();
            }
        });
    </script>
`;

content = content.replace('</body>', bubbleCursorCode + '\n</body>');
fs.writeFileSync(filePath, content, 'utf8');
console.log("Bubble Cursor injected successfully.");
