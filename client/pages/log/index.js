// Abrir e fechar menu de navegação (Nav) no mobile
function toggleNav() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

// Abrir e fechar popup de alerta
function togglePopupAlert() {
  const popupAlert = document.querySelector(".popupAlert");
  popupAlert.classList.toggle("active");
}

// Fechar popup de cadastro de filme
function closePopupMovie() {
  document.querySelector(".popupMovie").classList.remove("active");
}

// API --------------------------------------------------------------------

// Cadastrar filme
document.querySelector("#formMovie").addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.querySelector("#titulo").value;
  const ano = document.querySelector("#ano").value;
  const poster = document.querySelector("#poster").value;
  const nota = document.querySelector('input[name="nota"]:checked').value;
  const favorito = false;

  const response = await fetch("http://localhost:3000/filmes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, ano, poster, nota, favorito }),
  });

  togglePopupAlert();
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2Q4MzZiNTJlZmFiNzkxYWYxOWI3YWM0OTQxZTdjNyIsInN1YiI6IjYwNzdjZTExNzc3NmYwMDAyOTg1MDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ppFAJLYKfn3s0gzSs7lCxsmkH2de4y7B86xZGug2_8A",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector(".inputSearchMovie");
  let currentValue = "";

  inputField.addEventListener("input", function (event) {
    currentValue = event.target.value;
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${currentValue}&language=pt-BR`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const moviesSearched = document.querySelector(`.moviesSearched`);
        moviesSearched.innerHTML = "";

        response.results.slice(0, 6).forEach((filme) => {
          const poster = document.createElement("div");
          poster.classList.add("poster");
          poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${filme.poster_path})`;
          moviesSearched.appendChild(poster);

          poster.addEventListener("click", function () {
            document.querySelector(".popupMovie").classList.add("active");
            document.querySelector(
              ".posterPopup"
            ).style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${filme.poster_path})`;
            document.querySelector("#titulo").value = filme.title;
            document.querySelector("#ano").value = filme.release_date.slice(
              0,
              4
            );
            document.querySelector("#poster").value = filme.poster_path;
          });
        });
      })
      .catch((err) => console.error(err));
  });
});
