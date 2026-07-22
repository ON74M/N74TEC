/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: none !important; /* ZERA TODA ANIMAÇÃO DE TROCA DE PAGINA */
}

html, body {
  height: 100%;
  background: #000;
  color: #39ff14; /* verde mais claro pra acessibilidade */
  font-family: 'Courier New', Courier, monospace;
  overflow-x: hidden;
  animation: none !important;
  opacity: 1 !important;
}

/* CANVAS MATRIX */
#matrix {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

/* TOPBAR */
.topbar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid #00ff41;
}

.topbar button {
  position: absolute;
  left: 20px;
  background: none;
  border: 1px solid #00ff41;
  color: #00ff41;
  font-size: 24px;
  cursor: pointer;
  padding: 5px 10px;
}

.logo {
  max-width: 300px;
  height: auto;
}

/* CONTAINER */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px 100px 20px; /* espaço pra bottom-nav */
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #39ff14;
}

h2 {
  font-size: 1.8rem;
  margin: 40px 0 20px 0;
  color: #39ff14;
}

h3 {
  font-size: 1.2rem;
  margin: 15px 0;
  color: #00ff41;
}

p, .subtitle {
  font-size: 1rem;
  line-height: 1.6;
  color: #ccc;
}

/* BOTAO */
.btn-enter {
  display: inline-block;
  margin-top: 40px;
  padding: 15px 30px;
  border: 2px solid #00ff41;
  color: #00ff41;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  background: rgba(0, 255, 65, 0.1);
}
.btn-enter:hover {
  background: #00ff41;
  color: #000;
}

/* CARDS SERVIÇOS */
.service-card {
  background: rgba(0, 255, 65, 0.05);
  border: 1px solid #00ff41;
  padding: 20px;
  margin: 20px 0;
  text-align: left;
}

/* MENU LATERAL */
.sidemenu {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: #000;
  overflow-x: hidden;
  border-right: 1px solid #00ff41;
}

.sidemenu.active {
  width: 250px;
}

.sidemenu a {
  padding: 15px 20px;
  text-decoration: none;
  font-size: 18px;
  color: #00ff41;
  display: block;
}
.sidemenu a:hover {
  background: #00ff41;
  color: #000;
}

#overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.7);
  z-index: 999;
}
#overlay.active {
  display: block;
}

/* MENU INFERIOR */
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.9);
  border-top: 1px solid #00ff41;
  padding: 10px 0;
}

.bottom-nav a {
  color: #00ff41;
  text-decoration: none;
  font-size: 12px;
  text-align: center;
}
.bottom-nav a i {
  display: block;
  font-size: 20px;
  margin-bottom: 5px;
}

/* MOBILE */
@media (max-width: 768px) {
  h1 { font-size: 1.8rem; }
  .logo { max-width: 200px; }
}
