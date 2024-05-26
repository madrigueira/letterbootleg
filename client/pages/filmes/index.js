// Linkando os components via load JQuery 
$("#header").load("/client/components/header/index.html");

const filmeList = document.getElementById('filmeList');

async function loadFilmes() {
  const response = await fetch('http://localhost:3000/filmes');
  const filmes = await response.json();
  filmes.forEach(filme => {
      const div = document.createElement('div');
      div.classList.add("poster")
      div.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${filme.poster})`;
      filmeList.appendChild(div);
  });
}

loadFilmes();