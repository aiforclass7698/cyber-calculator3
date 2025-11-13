// ========= 計算機邏輯 =========
const screen2 = document.getElementById('screen2');

function p2(v) {
  screen2.textContent += v;
}
function clr2() {
  screen2.textContent = '';
}
function calc2() {
  try {
    const expr = screen2.textContent || '0';
    screen2.textContent = eval(expr);
  } catch {
    screen2.textContent = 'NaN';
  }
}

// ========= Matrix 背景 =========
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

let w, h, columns, drops;
const chars = '01アイウエカキクサシスセタチツナニヌハヒフホマミムヤユヨラリルワ';

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  const fontSize = 16;
  columns = Math.floor(w / fontSize);
  drops = Array(columns).fill(0);
  ctx.font = fontSize + 'px Share Tech Mono';
}
window.addEventListener('resize', resize);
resize();

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#22c55e';
  for (let i = 0; i < columns; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const x = i * 16;
    const y = drops[i] * 16;

    ctx.fillText(text, x, y);

    if (y > h && Math.random() > 0.96) {
      drops[i] = 0;
    } else {
      drops[i]++;
    }
  }

  requestAnimationFrame(drawMatrix);
}
drawMatrix();

// ========= 線條游標軌跡 (Canvas) =========
const lineCanvas = document.createElement('canvas');
lineCanvas.id = 'line-trail';
document.body.appendChild(lineCanvas);
const lctx = lineCanvas.getContext('2d');
let lw, lh;
let points = [];

function resizeLine() {
  lw = lineCanvas.width = window.innerWidth;
  lh = lineCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeLine);
resizeLine();

window.addEventListener('mousemove', (e) => {
  points.push({ x: e.clientX, y: e.clientY });
  if (points.length > 40) points.shift();
});

function drawTrail() {
  lctx.clearRect(0, 0, lw, lh);

  if (points.length > 1) {
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const t = i / points.length;

      lctx.strokeStyle = `rgba(34,197,94,${t * 0.7})`;
      lctx.lineWidth = 6 * t;
      lctx.lineCap = 'round';
      lctx.beginPath();
      lctx.moveTo(p0.x, p0.y);
      lctx.lineTo(p1.x, p1.y);
      lctx.stroke();
    }
  }
  requestAnimationFrame(drawTrail);
}
drawTrail();