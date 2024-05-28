// Linkando os components via load JQuery 
$("#header").load("/client/components/header/index.html");
const favoriteGrid = document.querySelector(".favoriteGrid")

function preencherDivs() {
  var currentDivs = favoriteGrid.querySelectorAll('.poster').length;
  
  for (var i = currentDivs; i < 4; i++) {
      var newDiv = document.createElement('div');
      newDiv.className = 'poster';
      favoriteGrid.appendChild(newDiv);

      newDiv.addEventListener("click", async function() {
        const response = await fetch('http://localhost:3000/filmes');
        const filmes = await response.json();
        const filmesFiltrados = filmes.filter(filme => filme.favorito != true);
        const test = document.querySelector(".test")
        filmesFiltrados.forEach(filme => {
          const a1 = document.createElement('a');
          a1.textContent = filme.titulo
          a1.addEventListener("click", async function(){
            editFilme(filme._id, true)
          },{ once: true })
          test.appendChild(a1);
        }) 
      })
  }

  console.log(currentDivs)
}

const filmeList = document.querySelector('.favoriteGrid');

async function loadFilmes() {
  const response = await fetch('http://localhost:3000/filmes');
  const filmes = await response.json();
  const filmesFiltrados = filmes.filter(filme => filme.favorito == true);
  filmesFiltrados.forEach(filme => {
      const div = document.createElement('div');
      const a1 = document.createElement('a');
      const a2 = document.createElement('a');
      const button = document.createElement('button');
      const button2 = document.createElement('button');
      div.classList.add("poster")
      div.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${filme.poster})`;
      a1.textContent = filme.ano
      a2.textContent = `★ ${filme.nota}`
      filmeList.appendChild(div);
      div.appendChild(a1);
      div.appendChild(a2);
      div.appendChild(button);

      button.addEventListener("click", function() {
        editFilme(filme._id, false);
      })
  });
}


async function editFilme(id, favorito) {
      // e.preventDefault();
      console.log("kekna")
  
      const response = await fetch(`http://localhost:3000/filmes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favorito })
      });
  
      if (response.ok) {
        console.log("filme cadastrado!")
        favoriteGrid.innerHTML = ''
        executarFuncoes();
    } else {
        console.log('Erro ao deletar filme');
    }
}

// loadFilmes()
// preencherDivs()

async function executarFuncoes() {
  await loadFilmes(); // Aguarda a conclusão da adição das divs
  preencherDivs(); // Verifica a quantidade de divs
}

// Chama a função que executa ambas as funções
executarFuncoes();