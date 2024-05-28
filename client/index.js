// Linkando os components via load JQuery 
$("#header").load("/client/components/header/index.html");

// Abrir e fechar menu de navegação (Nav) no mobile
function toggleNav(){
  const nav = document.querySelector("nav")
  nav.classList.toggle("active")
}

// Solicitação HTTP pra API do The Movie Data Base
const optionsTMDB = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2Q4MzZiNTJlZmFiNzkxYWYxOWI3YWM0OTQxZTdjNyIsInN1YiI6IjYwNzdjZTExNzc3NmYwMDAyOTg1MDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ppFAJLYKfn3s0gzSs7lCxsmkH2de4y7B86xZGug2_8A'
  }
};

// Fecth nos filmes mais recentes pela API do TMDB
fetch('https://api.themoviedb.org/3/movie/now_playing?language=pt-BR', optionsTMDB)
  .then(response => response.json())
  .then(response => {
    let numberSlide = 1
    response.results.slice(0, 12).forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('poster');
      movieDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${movie.poster_path})`;
      document.querySelector(`.slide${numberSlide}`).appendChild(movieDiv);
      numberSlide++
    });
  })
  .catch(err => console.error(err));