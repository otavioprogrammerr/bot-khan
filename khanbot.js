javascript:(function(){
    // Injetar CSS customizado (Glassmorphism + Neon)
    const style = document.createElement("style");
    style.innerHTML = `
    .lunar-panel {
        position: fixed;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        background: rgba(20, 20, 30, 0.6);
        backdrop-filter: blur(12px);
        border-radius: 20px;
        padding: 15px;
        width: 180px;
        color: white;
        font-family: Arial, sans-serif;
        box-shadow: 0 0 15px rgba(0,255,200,0.3);
        z-index: 99999;
    }
    .lunar-panel h2 {
        font-size: 16px;
        margin: 0 0 10px;
        text-align: center;
        color: #00ffc3;
        text-shadow: 0 0 8px #00ffc3;
    }
    .lunar-btn {
        display: block;
        margin: 10px auto;
        padding: 10px;
        width: 140px;
        border: none;
        border-radius: 50px;
        background: linear-gradient(45deg, #00ffc3, #0077ff);
        color: black;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 0 10px #00ffc3;
    }
    .lunar-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px #00ffc3;
    }
    .lunar-toast {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: rgba(0,0,0,0.8);
        padding: 12px 20px;
        border-radius: 10px;
        color: #fff;
        font-size: 14px;
        box-shadow: 0 0 15px #00ffc3;
        z-index: 100000;
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    `;
    document.head.appendChild(style);

    // Função de notificação
    function showToast(msg){
        let toast = document.createElement("div");
        toast.className = "lunar-toast";
        toast.innerText = msg;
        document.body.appendChild(toast);
        setTimeout(()=>{ toast.style.opacity = 1; }, 100);
        setTimeout(()=>{ toast.style.opacity = 0; }, 2500);
        setTimeout(()=>{ toast.remove(); }, 3000);
    }

    // Painel principal
    const panel = document.createElement("div");
    panel.className = "lunar-panel";
    panel.innerHTML = `
        <h2>☾ Eclipse Neon ☽</h2>
        <button class="lunar-btn" id="darkModeBtn">🌙 Dark Mode</button>
        <button class="lunar-btn" id="speedBtn">⚡ Turbo</button>
        <button class="lunar-btn" id="customBtn">✨ Função X</button>
    `;
    document.body.appendChild(panel);

    // Exemplo de funções
    let darkOn = false;
    document.getElementById("darkModeBtn").onclick = ()=>{
        darkOn = !darkOn;
        document.body.style.filter = darkOn ? "invert(1) hue-rotate(180deg)" : "none";
        showToast("Dark Mode " + (darkOn ? "Ativado" : "Desativado"));
    };

    let turboOn = false;
    document.getElementById("speedBtn").onclick = ()=>{
        turboOn = !turboOn;
        showToast("Turbo " + (turboOn ? "Ligado" : "Desligado"));
    };

    document.getElementById("customBtn").onclick = ()=>{
        showToast("✨ Função secreta ativada!");
    };

    showToast("☾ Eclipse Neon carregado!");
})();
