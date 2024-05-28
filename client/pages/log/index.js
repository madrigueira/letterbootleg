// Linkando os components via load JQuery 
$("#header").load("/client/components/header/index.html");

const formLogMovie = document.getElementById('formLogMovie');

formLogMovie.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const ano = document.getElementById('ano').value;
    const poster = document.getElementById('poster').value;
    const nota = document.querySelector('input[name="nota"]:checked').value;
    const favorito = false

    const response = await fetch('http://localhost:3000/filmes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, ano, poster, nota, favorito })
    });

    alert("filme cadastrado!")
});

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2Q4MzZiNTJlZmFiNzkxYWYxOWI3YWM0OTQxZTdjNyIsInN1YiI6IjYwNzdjZTExNzc3NmYwMDAyOTg1MDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ppFAJLYKfn3s0gzSs7lCxsmkH2de4y7B86xZGug2_8A'
    }
  };


document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.querySelector(".inputSearchMovie");
    let currentValue = "";

    inputField.addEventListener("input", function(event) {
        currentValue = event.target.value;
        fetch(`https://api.themoviedb.org/3/search/movie?query=${currentValue}&language=pt-BR`, options)
        .then(response => response.json())
        .then(response => {
            document.querySelector(`.moviesSearched`).innerHTML = ""
            response.results.slice(0, 6).forEach(movie => {
                const nome = document.createElement('div')
                nome.classList.add("poster")
                nome.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${movie.poster_path})`;
                document.querySelector(`.moviesSearched`).appendChild(nome)

                nome.addEventListener("click", function() {
                    document.querySelector(".popupMovieLog").classList.add("active")
                    document.querySelector(".posterPopup").style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${movie.poster_path})`;
                    document.getElementById('titulo').value = movie.title
                    document.getElementById('ano').value = movie.release_date.slice(0, 4)
                    document.getElementById('poster').value = movie.poster_path
                });
            });
        })
        .catch(err => console.error(err));
    });
});

function closePopup(){
    document.querySelector(".popupMovieLog").classList.remove("active")
}