// mainMenu.js - Plataform Store

const watermark = document.createElement('div');
const dropdownMenu = document.createElement('div');

const setFeatureByPath = (path, value) => {
    let obj = window;
    const parts = path.split('.');
    while (parts.length > 1) {
        obj = obj[parts.shift()];
    }
    obj[parts[0]] = value;
};

function addFeature(features) {
    features.forEach(featureData => {
        const featureWrapper = document.createElement('div');
        featureWrapper.className = 'feature';
        if (featureData.className) {
            featureWrapper.classList.add(featureData.className);
        }

        let elementHTML = '';
        switch(featureData.type) {
            case 'checkbox':
                elementHTML = `
                    <label for="${featureData.name}">${featureData.label}</label>
                    <label class="switch">
                        <input type="checkbox" id="${featureData.name}" ${featureData.attributes || ''}>
                        <span class="slider"></span>
                    </label>
                `;
                featureWrapper.classList.add('toggle-feature');
                break;
            case 'range':
                elementHTML = `
                    <label for="${featureData.name}">${featureData.label || ''}</label>
                    <input type="range" id="${featureData.name}" ${featureData.attributes || ''}>
                `;
                 featureWrapper.classList.add('range-feature');
                break;
            case 'text':
                elementHTML = `
                    <label for="${featureData.name}">${featureData.label}</label>
                    <input type="text" id="${featureData.name}" ${featureData.attributes || ''}>
                `;
                 featureWrapper.classList.add('text-feature');
                break;
            case 'nonInput':
                elementHTML = `<label class="header-label" ${featureData.attributes || ''}>${featureData.name}</label>`;
                featureWrapper.classList.add('header-feature');
                break;
        }
        
        featureWrapper.innerHTML = elementHTML;

        // Set data attributes after creating the element
        const inputElement = featureWrapper.querySelector('input');
        if (inputElement && featureData.variable) {
            inputElement.setAttribute('setting-data', featureData.variable);
        }
        if (inputElement && featureData.dependent) {
            inputElement.setAttribute('dependent', featureData.dependent);
        }

        dropdownMenu.appendChild(featureWrapper);
    });
}


function handleInput(ids, callback = null) {
    const elements = Array.isArray(ids) ? ids.map(id => document.getElementById(id)) : [document.getElementById(ids)];
    
    elements.forEach(element => {
        if (!element) return;
        
        const setting = element.getAttribute('setting-data');
        const dependent = element.getAttribute('dependent');

        const handleEvent = (e) => {
            let value;
            if (element.type === 'checkbox') {
                value = e.target.checked;
            } else {
                value = e.target.value;
            }
            
            setFeatureByPath(setting, value);
            if (callback) callback(value, e);

            if (element.type === 'checkbox' && dependent) {
                const displayStyle = e.target.checked ? 'flex' : 'none';
                dependent.split(',').forEach(depClass => {
                    document.querySelectorAll(`.${depClass}`).forEach(depEl => {
                        depEl.style.display = displayStyle;
                    });
                });
            }
        };

        const eventType = (element.type === 'checkbox' || element.type === 'radio') ? 'change' : 'input';
        element.addEventListener(eventType, handleEvent);

        if (element.type === 'checkbox') {
             element.addEventListener('change', () => playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/5os0bypi.wav'));
        }
    });
}

/* Watermark */
Object.assign(watermark.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    width: 'auto',
    minWidth: '150px',
    height: '40px',
    background: 'linear-gradient(45deg, rgba(20, 20, 20, 0.7), rgba(40, 40, 40, 0.7))',
    color: '#EAEAEA',
    fontSize: '16px',
    fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    padding: '0 15px',
    borderRadius: '12px',
    zIndex: '1001',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
});

if (device.mobile) watermark.style.left = '50%';

watermark.innerHTML = `<span style="font-weight: bold; color: #7DF9FF; text-shadow: 0 0 5px #7DF9FF;">Plataform Store</span> <span style="color:gray; padding-left:8px; font-family: Arial, sans-serif; font-size:10px">${ver}</span>`;
document.body.appendChild(watermark);

/* Dropdown */
Object.assign(dropdownMenu.style, {
    position: 'absolute',
    top: '110%',
    right: '0',
    width: '280px',
    background: 'rgba(36, 40, 59, 0.8)',
    borderRadius: '12px',
    color: '#c0caf5',
    fontSize: '14px',
    fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
    display: 'none',
    flexDirection: 'column',
    zIndex: '1000',
    padding: '10px',
    cursor: 'default',
    userSelect: 'none',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(122, 162, 247, 0.2)',
    gap: '5px'
});

dropdownMenu.innerHTML = `
    <style>
        .feature { padding: 5px; border-radius: 6px; display: flex; align-items: center; justify-content: space-between; }
        .feature:hover { background-color: rgba(122, 162, 247, 0.1); }
        .feature > label { flex-grow: 1; }
        .header-feature { padding-top: 10px; padding-bottom: 2px; }
        .header-label { font-weight: bold; font-size: 0.8em; color: #7aa2f7; text-transform: uppercase; letter-spacing: 0.5px; }
        .text-feature { flex-direction: column; align-items: stretch; gap: 5px; }
        .text-feature input { width: 100%; box-sizing: border-box; }
        .range-feature { display: none; /* Controlled by dependent */}

        /* Inputs */
        input[type="text"], input[type="number"] { 
            background: #1a1b26; border: 1px solid #414868; color: #c0caf5; 
            padding: 8px; border-radius: 6px; outline: none; transition: border-color 0.2s;
        }
        input[type="text"]:focus, input[type="number"]:focus { border-color: #7aa2f7; }

        input[type="range"] { 
            width: 100%; accent-color: #7aa2f7; background: transparent; cursor: pointer;
        }
        
        /* Modern Toggle Switch */
        .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #414868; transition: .4s; border-radius: 24px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: #7aa2f7; }
        input:checked + .slider:before { transform: translateX(20px); }
        .user-info { font-size: 10px; text-align: center; color: #565f89; padding-top: 10px; border-top: 1px solid #414868; margin-top: 5px; }
    </style>
`;
watermark.appendChild(dropdownMenu);

let featuresList = [
    { name: 'questionSpoof', label: 'Question Spoof', type: 'checkbox', variable: 'features.questionSpoof', attributes: 'checked' },
    { name: 'videoSpoof', label: 'Video Spoof', type: 'checkbox', variable: 'features.videoSpoof', attributes: 'checked' },
    { name: 'showAnswers', label: 'Answer Revealer', type: 'checkbox', variable: 'features.showAnswers' },
    { name: 'autoAnswer', label: 'Auto Answer', type: 'checkbox', variable: 'features.autoAnswer', dependent: 'autoAnswerDelay,nextRecomendation,repeatQuestion' },
    { name: 'repeatQuestion', label: 'Repeat Question', className: 'repeatQuestion', type: 'checkbox', variable: 'features.repeatQuestion', attributes: 'style="display:none;"' },
    { name: 'nextRecomendation', label: 'Recommendations', className: 'nextRecomendation', type: 'checkbox', variable: 'features.nextRecomendation', attributes: 'style="display:none;"' },
    { name: 'autoAnswerDelay', label: 'Answer Delay', className: 'autoAnswerDelay', type: 'range', variable: 'features.autoAnswerDelay', attributes: 'style="display:none;" min="1" max="3" value="1"' },
    { name: 'minuteFarm', label: 'Minute Farmer', type: 'checkbox', variable: 'features.minuteFarmer' },
    { name: 'customBanner', label: 'Custom Banner', type: 'checkbox', variable: 'features.customBanner' },
    { name: 'rgbLogo', label: 'RGB Logo', type: 'checkbox', variable: 'features.rgbLogo' },
    { name: 'darkMode', label: 'Dark Mode', type: 'checkbox', variable: 'features.darkMode', attributes: 'checked' },
    { name: 'onekoJs', label: 'oneko.js Cat', type: 'checkbox', variable: 'features.onekoJs' },
    { name: 'Customization', type: 'nonInput' },
    { name: 'customName', label: 'Custom Username', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off" placeholder="Enter new username"' },
    { name: 'customPfp', label: 'Custom PFP URL', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off" placeholder="Enter image URL"' }
];

addFeature(featuresList);

const userInfo = document.createElement('div');
userInfo.className = 'user-info';
userInfo.innerHTML = `${user.username} - UID: ${user.UID}`;
dropdownMenu.appendChild(userInfo);


// Initialize handlers
handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
handleInput(['customName', 'customPfp']);
handleInput('autoAnswer', (isChecked) => {
    if (isChecked && !features.questionSpoof) {
        const spoofCheckbox = document.querySelector('[setting-data="features.questionSpoof"]');
        spoofCheckbox.checked = true;
        features.questionSpoof = true;
        // Manually trigger change event for spoofCheckbox if needed
        spoofCheckbox.dispatchEvent(new Event('change'));
    }
});
handleInput('autoAnswerDelay', value => {
    if (value) featureConfigs.autoAnswerDelay = 4 - value;
});
handleInput('darkMode', (isChecked) => {
    if (isChecked) {
        DarkReader.setFetchMethod(window.fetch);
        DarkReader.enable();
    } else {
        DarkReader.disable();
    }
});
handleInput('onekoJs', (isChecked) => {
    const onekoEl = document.getElementById('oneko');
    if (onekoEl) {
        onekoEl.style.display = isChecked ? 'block' : 'none';
    }
});

// Drag and Drop Logic
let isDragging = false, offsetX, offsetY;
watermark.addEventListener('mousedown', e => {
    if (e.target === watermark || watermark.contains(e.target) && !dropdownMenu.contains(e.target)) {
        isDragging = true;
        offsetX = e.clientX - watermark.getBoundingClientRect().left;
        offsetY = e.clientY - watermark.getBoundingClientRect().top;
        watermark.style.cursor = 'grabbing';
        watermark.style.transform = 'scale(0.95)';
        dropdownMenu.style.display = 'none';
    }
});
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        watermark.style.cursor = 'pointer';
        watermark.style.transform = 'scale(1)';
    }
});
document.addEventListener('mousemove', e => {
    if (isDragging) {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
        const maxX = window.innerWidth - watermark.offsetWidth;
        const maxY = window.innerHeight - watermark.offsetHeight;

        watermark.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
        watermark.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
        watermark.style.right = 'auto'; // Override initial 'right'
    }
});

// Show/Hide Logic
watermark.addEventListener('mouseenter', () => {
    if (!isDragging) {
        dropdownMenu.style.display = 'flex';
        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav');
    }
});
watermark.addEventListener('mouseleave', () => {
    dropdownMenu.style.display = 'none';
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav');
});
