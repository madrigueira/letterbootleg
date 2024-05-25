// Linkando os components via load JQuery 
$("#header").load("./components/header/index.html");

// Abrir e fechar menu de navegação (Nav) no mobile
function toggleNav(){
  const nav = document.querySelector("nav")
  nav.classList.toggle("active")
}
