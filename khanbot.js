javascript:(function(){
  // Container do menu
  const menu=document.createElement("div");
  menu.style.position="fixed";
  menu.style.top="20px";
  menu.style.right="20px";
  menu.style.padding="12px";
  menu.style.borderRadius="10px";
  menu.style.background="linear-gradient(135deg,#1e3c72,#2a5298)";
  menu.style.color="#fff";
  menu.style.fontFamily="Arial, sans-serif";
  menu.style.boxShadow="0 4px 12px rgba(0,0,0,0.3)";
  menu.style.zIndex=999999;

  // Título
  const title=document.createElement("h4");
  title.innerText="KhanBot 🔥";
  title.style.margin="0 0 10px";
  title.style.fontSize="16px";
  menu.appendChild(title);

  // Dark Mode
  const darkBtn=document.createElement("button");
  darkBtn.innerText="🌙 Dark Mode";
  darkBtn.style.marginRight="5px";
  darkBtn.style.padding="5px 8px";
  darkBtn.style.border="none";
  darkBtn.style.borderRadius="6px";
  darkBtn.style.background="#ff9800";
  darkBtn.style.color="#fff";
  darkBtn.style.cursor="pointer";
  darkBtn.onclick=()=>document.body.style.filter=document.body.style.filter?"":"invert(1) hue-rotate(180deg)";
  menu.appendChild(darkBtn);

  // Auto Complete
  const autoBtn=document.createElement("button");
  autoBtn.innerText="⚡ Auto Complete";
  autoBtn.style.marginRight="5px";
  autoBtn.style.padding="5px 8px";
  autoBtn.style.border="none";
  autoBtn.style.borderRadius="6px";
  autoBtn.style.background="#4caf50";
  autoBtn.style.color="#fff";
  autoBtn.style.cursor="pointer";
  autoBtn.onclick=()=>alert("Auto Complete ativado!"); // Aqui você pode colocar a função real
  menu.appendChild(autoBtn);

  // Question Spoof
  const spoofBtn=document.createElement("button");
  spoofBtn.innerText="🎭 Question Spoof";
  spoofBtn.style.padding="5px 8px";
  spoofBtn.style.border="none";
  spoofBtn.style.borderRadius="6px";
  spoofBtn.style.background="#f44336";
  spoofBtn.style.color="#fff";
  spoofBtn.style.cursor="pointer";
  spoofBtn.onclick=()=>alert("Question Spoof ativado!"); // Aqui você pode colocar a função real
  menu.appendChild(spoofBtn);

  // Adicionar menu à página
  document.body.appendChild(menu);

  // Função de carregamento original do script
  fetch("https://raw.githubusercontent.com/otavioprogrammerr/bot-khan/main/khanbot.js")
    .then(r=>r.text())
    .then(eval)
    .catch(console.error);
})();
