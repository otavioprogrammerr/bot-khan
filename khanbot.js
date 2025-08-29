// ====== khanbot.js ======

// Configurações do bot
const KhanBot = {
    version: "1.0.0",
    settings: {
        darkMode: false,
        autoComplete: false,
        questionSpoof: false
    }
};

// Função para ativar Dark Mode
function toggleDarkMode() {
    if(!KhanBot.settings.darkMode) {
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
        KhanBot.settings.darkMode = true;
        console.log("Dark Mode ativado ✅");
    } else {
        document.body.style.filter = "";
        KhanBot.settings.darkMode = false;
        console.log("Dark Mode desativado ❌");
    }
}

// Função para Auto Complete
function activateAutoComplete() {
    if(!KhanBot.settings.autoComplete) {
        KhanBot.settings.autoComplete = true;
        console.log("Auto Complete ativado ⚡");
        // Aqui você pode adicionar o código real de Auto Complete
    }
}

// Função para Question Spoof
function activateQuestionSpoof() {
    if(!KhanBot.settings.questionSpoof) {
        KhanBot.settings.questionSpoof = true;
        console.log("Question Spoof ativado 🎭");
        // Aqui você pode adicionar o código real de Spoof
    }
}

// Função para criar menu flutuante
function createMenu() {
    if(document.getElementById("khanbot-menu")) return;

    const menu = document.createElement("div");
    menu.id = "khanbot-menu";
    menu.style.position = "fixed";
    menu.style.top = "20px";
    menu.style.right = "20px";
    menu.style.padding = "12px";
    menu.style.borderRadius = "10px";
    menu.style.background = "linear-gradient(135deg,#1e3c72,#2a5298)";
    menu.style.color = "#fff";
    menu.style.fontFamily = "Arial,sans-serif";
    menu.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    menu.style.zIndex = 999999;

    const title = document.createElement("h4");
    title.innerText = "KhanBot 🔥";
    title.style.margin = "0 0 10px";
    menu.appendChild(title);

    const darkBtn = document.createElement("button");
    darkBtn.innerText = "🌙 Dark Mode";
    darkBtn.style.marginRight = "5px";
    darkBtn.onclick = toggleDarkMode;
    menu.appendChild(darkBtn);

    const autoBtn = document.createElement("button");
    autoBtn.innerText = "⚡ Auto Complete";
    autoBtn.style.marginRight = "5px";
    autoBtn.onclick = activateAutoComplete;
    menu.appendChild(autoBtn);

    const spoofBtn = document.createElement("button");
    spoofBtn.innerText = "🎭 Question Spoof";
    spoofBtn.onclick = activateQuestionSpoof;
    menu.appendChild(spoofBtn);

    document.body.appendChild(menu);
}

// Inicializa o bot
createMenu();
console.log("KhanBot v" + KhanBot.version + " carregado!");
