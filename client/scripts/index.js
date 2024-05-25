// Linkando os components via load JQuery 
$("#header").load("./components/header/index.html");

// Abrir e fechar menu de navegação (Nav) no mobile
function toggleNav(){
  const nav = document.querySelector("nav")
  nav.classList.toggle("active")
}

var splide = new Splide( '.splide', {
  perPage: 6,
  perMove: 1,
  pagination: false,
  omitEnd: true,
  gap: '10px',
  rewind : true,
  breakpoints: {
		850: {
			perPage: 4,
		},
    500: {
			perPage: 3,
		},
  }
} );

splide.mount();