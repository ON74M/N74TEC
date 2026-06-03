/* =========================
   N74 TEC IA PLATFORM CORE
========================= */

/* MATRIX */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let fontSize = 15;
let chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&";
let columns;
let drops = [];

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
init();
}

function init(){
columns = Math.floor(canvas.width / fontSize);
drops = Array(columns).fill(1);
}

function draw(){
ctx.fillStyle = "rgba(0,0,0,0.04)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle = "#00ff41";
ctx.font = fontSize + "px monospace";

for(let i=0;i<drops.length;i++){
let text = chars[Math.floor(Math.random()*chars.length)];
ctx.fillText(text, i*fontSize, drops[i]*fontSize);

if(drops[i]*fontSize > canvas.height && Math.random() > 0.975){
drops[i]=0;
}

drops[i]+=0.75;
}
}

setInterval(draw,45);
window.addEventListener("resize", resize);
resize();


/* MENU GLOBAL */
document.addEventListener("DOMContentLoaded", () => {

const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

if(menuButton && sideMenu && menuOverlay){

menuButton.addEventListener("click", () => {
sideMenu.classList.toggle("active");
menuOverlay.classList.toggle("active");
});

menuOverlay.addEventListener("click", () => {
sideMenu.classList.remove("active");
menuOverlay.classList.remove("active");
});

}

});