// ==UserScript==
// @name         Plataform Store
// @version      1.0.1
// @description  Interface de app com Dark Mode, botões internos, Toasts e controle de velocidade
// @author       Você
// ==/UserScript==

(function() {
    'use strict';

    const appConfig = {
        version: "1.0.1",
        darkMode: { enabled: false },
        options: {
            speed: 1,
            notifications: true,
            autoComplete: true
        }
    };

    function createElement(tag, props = {}, styles = {}, parent = document.body) {
        const el = document.createElement(tag);
        Object.assign(el, props);
        Object.assign(el.style, styles);
        parent.appendChild(el);
        return el;
    }

    // Container principal
    const container = createElement('div', {}, {
        position: 'fixed',
        top: '50px',
        right: '50px',
        width: '360px',
        background: '#f0f2f5',
        color: '#333',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        fontFamily: 'Arial, sans-serif',
        zIndex: 9999,
        overflow: 'hidden'
    });

    const header = createElement('div', { innerText: 'Plataform Store v' + appConfig.version }, {
        background: '#4b0082',
        color: '#fff',
        padding: '15px',
        fontWeight: 'bold',
        fontSize: '18px',
        textAlign: 'center'
    }, container);

    // Dark Mode toggle
    const darkModeContainer = createElement('div', {}, {
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ccc'
    }, container);
    createElement('span', { innerText: 'Dark Mode' }, { fontWeight: '500' }, darkModeContainer);
    const darkToggle = createElement('input', { type: 'checkbox' }, {}, darkModeContainer);
    darkToggle.checked = appConfig.darkMode.enabled;

    darkToggle.addEventListener('change', () => {
        appConfig.darkMode.enabled = darkToggle.checked;
        if(appConfig.darkMode.enabled){
            container.style.background = '#1e1e2f';
            container.style.color = '#fff';
        } else {
            container.style.background = '#f0f2f5';
            container.style.color = '#333';
        }
        showToast('Dark Mode ' + (appConfig.darkMode.enabled ? 'Enabled' : 'Disabled'));
    });

    // Velocidade
    const speedContainer = createElement('div', {}, {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid #ccc'
    }, container);
    createElement('label', { innerText: 'Velocidade' }, { marginBottom: '5px' }, speedContainer);
    const speedSlider = createElement('input', { type: 'range', min: 1, max: 5, value: appConfig.options.speed }, {}, speedContainer);
    const speedValue = createElement('span', { innerText: appConfig.options.speed }, { marginTop: '5px', fontSize: '14px' }, speedContainer);
    speedSlider.addEventListener('input', () => {
        appConfig.options.speed = speedSlider.value;
        speedValue.innerText = speedSlider.value;
        showToast('Velocidade ajustada: ' + speedSlider.value);
    });

    // Botões internos
    const buttonContainer = createElement('div', {}, {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    }, container);

    function createButton(text, callback) {
        const btn = createElement('button', { innerText: text }, {
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            background: '#4b0082',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '14px'
        }, buttonContainer);
        btn.addEventListener('click', callback);
        return btn;
    }

    createButton('Mostrar Velocidade Atual', () => {
        showToast('Velocidade atual: ' + appConfig.options.speed);
    });

    createButton('Ativar Auto Complete', () => {
        appConfig.options.autoComplete = true;
        showToast('Auto Complete ativado ✅');
    });

    createButton('Desativar Auto Complete', () => {
        appConfig.options.autoComplete = false;
        showToast('Auto Complete desativado ❌');
    });

    createButton('Testar Notificação', () => {
        showToast('Esta é uma notificação de teste!');
    });

    // Toast
    function showToast(msg, duration = 2000) {
        const toast = createElement('div', { innerText: msg }, {
            position: 'fixed',
            bottom: '50px',
            right: '50px',
            background: '#4b0082',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            fontWeight: '500',
            zIndex: 10000,
            opacity: 0,
            transition: 'opacity 0.3s'
        }, document.body);
        setTimeout(() => { toast.style.opacity = 1; }, 50);
        setTimeout(() => { toast.style.opacity = 0; setTimeout(()=>toast.remove(), 300); }, duration);
    }

})();
