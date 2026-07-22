// 1. EFEITO MATRIX VERDE #00ff41
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "N74TEC0101010101010101010";
const fontSize = 14;

// NOVO: Otimização pra mobile
const isMobile = window.innerWidth < 768;
const drops = isMobile? 50 : 100; // 50 colunas no celular, 100 no PC

const columns = drops;
const drop = [];

for(let i = 0; i < columns; i++)
    drop[i] = 1; 

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // rastro
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#00ff41"; // cor verde N74
    ctx.font = fontSize + "px monospace";
    
    for(let i = 0; i < drop.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drop[i] * fontSize);
        
        if(drop[i] * fontSize > canvas.height && Math.random() > 0.975)
            drop[i] = 0;
        
        drop[i]++;
    }
}

setInterval(drawMatrix, 33);

// Redimensionar canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 2. FUNÇÃO DO MENU LATERAL
function toggleMenu() {
    const menu = document.getElementById('sidemenu');
    const overlay = document.getElementById('overlay');
    
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Fechar menu ao clicar em link
document.querySelectorAll('.sidemenu a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});
