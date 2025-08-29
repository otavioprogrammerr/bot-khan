// statusPanel.js - Plataform Store

const statsPanel = document.createElement('div');

Object.assign(statsPanel.style, {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '260px',
    height: '35px',
    background: 'linear-gradient(45deg, rgba(20, 20, 20, 0.7), rgba(40, 40, 40, 0.7))',
    color: '#EAEAEA',
    fontSize: '14px',
    fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'grab',
    borderRadius: '12px',
    userSelect: 'none',
    zIndex: '1000',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
});

const getPing = async () => {
    if (window.disablePing) return '--';
    try {
        const startTime = performance.now();
        await fetch('https://pt.khanacademy.org/', { method: 'HEAD', mode: 'no-cors' });
        return Math.round(performance.now() - startTime);
    } catch {
        return 'Error';
    }
};

let lastFrameTime = performance.now(), frameCount = 0, fps = 0;

(function calcFPS() {
    frameCount++;
    const now = performance.now();
    if (now - lastFrameTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (now - lastFrameTime));
        frameCount = 0;
        lastFrameTime = now;
    }
    requestAnimationFrame(calcFPS);
})();

const getTime = () => new Date().toLocaleTimeString('en-US', { hour12: false });

const updateStatus = async () => {
    const currentPing = await getPing();
    statsPanel.innerHTML = `
        <span style="font-weight: bold; color: #7DF9FF; text-shadow: 0 0 5px #7DF9FF;">PS</span>
        <span style="margin: 0 10px; color: rgba(255,255,255,0.3);">|</span>
        <span>${fps} FPS</span>
        <span style="margin: 0 10px; color: rgba(255,255,255,0.3);">|</span>
        <span>${currentPing}ms</span>
        <span style="margin: 0 10px; color: rgba(255,255,255,0.3);">|</span>
        <span>${getTime()}</span>
    `;
};

updateStatus();
document.body.appendChild(statsPanel);
setInterval(updateStatus, 1000);

let isDragging = false, offsetX, offsetY;

statsPanel.onmousedown = e => {
    isDragging = true;
    statsPanel.style.cursor = 'grabbing';
    statsPanel.style.transform = 'scale(0.95)';
    statsPanel.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    offsetX = e.clientX - statsPanel.getBoundingClientRect().left;
    offsetY = e.clientY - statsPanel.getBoundingClientRect().top;
};

statsPanel.onmouseup = () => {
    isDragging = false;
    statsPanel.style.cursor = 'grab';
    statsPanel.style.transform = 'scale(1)';
    statsPanel.style.boxShadow = 'none';
};

document.onmousemove = e => {
    if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        const maxX = window.innerWidth - statsPanel.offsetWidth;
        const maxY = window.innerHeight - statsPanel.offsetHeight;

        statsPanel.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
        statsPanel.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
        statsPanel.style.bottom = 'auto'; // Override initial 'bottom'
    }
};

if (device.mobile) {
    plppdo.on('domChanged', () => {
        statsPanel.style.display = window.location.href.includes("khanacademy.org/profile") ? 'flex' : 'none';
    });
}
