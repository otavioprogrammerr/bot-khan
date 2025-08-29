// devTab.js - Plataform Store

plppdo.on('domChanged', () => {
    if (document.getElementById('plataformStoreTab')) return;

    const nav = document.querySelector('nav[data-testid="side-nav"]');
    if (!nav) return;

    function createTab(name, href = '#') {
        const li = document.createElement('li');
        li.innerHTML = `<a class="_8ry3zep" href="${href}" target="_blank"><span class="_xy39ea8">${name}</span></a>`;
        return li;
    }

    const section = document.createElement('section');
    section.id = 'plataformStoreTab';
    section.className = '_1ozlbq6';
    section.innerHTML = '<h2 class="_18undph9">Plataform Store</h2>';

    const ul = document.createElement('ul');
    const devTab = createTab('Developer');

    devTab.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close existing window if open
        if (window.plataformStoreWin && !window.plataformStoreWin.closed) {
            window.plataformStoreWin.focus();
            return;
        }
        
        window.plataformStoreWin = window.open("", "_blank", "width=600,height=550,resizable=yes,scrollbars=yes");

        if (window.plataformStoreWin) {
            window.plataformStoreWin.document.write(`
                <html>
                <head>
                    <title>Plataform Store Developer</title>
                    <style>
                        :root {
                            --bg-color: #1a1b26;
                            --surface-color: #24283b;
                            --text-color: #c0caf5;
                            --accent-color: #7aa2f7;
                            --border-color: rgba(192, 202, 245, 0.2);
                        }
                        body { 
                            font-family: 'Segoe UI', Roboto, Arial, sans-serif; 
                            background-color: var(--bg-color); 
                            color: var(--text-color); 
                            margin: 0;
                            padding: 20px;
                            box-sizing: border-box;
                        }
                        ::-webkit-scrollbar { width: 8px; }
                        ::-webkit-scrollbar-track { background: var(--bg-color); }
                        ::-webkit-scrollbar-thumb { background: #414868; border-radius: 4px; }
                        ::-webkit-scrollbar-thumb:hover { background: #565f89; }
                        .container { 
                            max-width: 100%;
                        }
                        h2 {
                            text-align: center;
                            margin-top: 0;
                            margin-bottom: 25px;
                            color: var(--accent-color);
                            font-weight: 500;
                        }
                        .toggle-container {
                            display: flex;
                            flex-direction: column;
                            gap: 15px;
                        }
                        .toggle { 
                            display: flex; 
                            justify-content: space-between; 
                            align-items: center; 
                            padding: 15px;
                            background-color: var(--surface-color);
                            border-radius: 8px;
                            border: 1px solid var(--border-color);
                        }
                        .toggle-info {
                            margin-right: 15px;
                        }
                        .toggle-info strong { font-size: 1em; color: var(--text-color); font-weight: 500; }
                        .toggle-info small { font-size: 0.8em; color: #a9b1d6; }
                        
                        /* Modern Toggle Switch */
                        .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
                        .switch input { opacity: 0; width: 0; height: 0; }
                        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #414868; transition: .4s; border-radius: 24px; }
                        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
                        input:checked + .slider { background-color: var(--accent-color); }
                        input:checked + .slider:before { transform: translateX(20px); }

                        .debug-box { 
                            width: 100%; 
                            height: 180px; 
                            overflow-y: auto; 
                            background: #15161e; 
                            color: #a9b1d6;
                            padding: 10px; 
                            font-family: 'Fira Code', monospace;
                            font-size: 0.85em;
                            white-space: pre-wrap; 
                            border-radius: 8px;
                            border: 1px solid var(--border-color);
                            margin-top: 25px;
                            box-sizing: border-box;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Developer Options</h2>
                        <div class="toggle-container" id="toggles"></div>
                        <div class="debug-box" id="debugBox"></div>
                    </div>
                </body>
                </html>
            `);
            window.plataformStoreWin.document.close(); // Important to finalize writing

            // Populate toggles after document is written
            createToggle('Debug Mode', 'Enables debugging logs in the panel below', 'debugMode', window.debugMode || false);
            createToggle('Disable Security', 'Re-enables Right-Click and DevTools', 'disableSecurity', window.disableSecurity || false);
            createToggle('Disable Ping', 'Stops sending requests to check latency', 'disablePing', window.disablePing || false);
        }
    });

    ul.appendChild(devTab);
    section.appendChild(ul);
    nav.appendChild(section);
});

window.createToggle = function(name, desc, varName, isToggled = false) {
    if (!window.plataformStoreWin || window.plataformStoreWin.closed) return;

    const toggleContainer = window.plataformStoreWin.document.getElementById('toggles');
    if (!toggleContainer) return;

    const toggleId = `toggle-${varName}`;
    const toggleElement = document.createElement('div');
    toggleElement.className = 'toggle';
    toggleElement.innerHTML = `
        <div class="toggle-info">
            <strong>${name}</strong><br>
            <small>${desc}</small>
        </div>
        <label class="switch">
            <input type="checkbox" id="${toggleId}" ${isToggled ? "checked" : ""}>
            <span class="slider"></span>
        </label>
    `;

    toggleContainer.appendChild(toggleElement);

    const checkbox = window.plataformStoreWin.document.getElementById(toggleId);
    checkbox.addEventListener('change', (e) => {
        window[varName] = e.target.checked;
        debug(`'${name}' set to ${window[varName]}`);
    });
};

window.debug = function(message) {
    if (!window.plataformStoreWin || window.plataformStoreWin.closed || !window.debugMode) return;
    
    const debugBox = window.plataformStoreWin.document.getElementById('debugBox');
    if (debugBox) {
        const timestamp = new Date().toLocaleTimeString();
        debugBox.innerHTML += `[${timestamp}] ${message}\n`;
        debugBox.scrollTop = debugBox.scrollHeight;
    }
};

window.onerror = function(message, source, lineno, colno, error) {
    debug(`🚨 ERROR: ${error ? error.stack : message} @ ${source}:${lineno}`);
    return true;
};
