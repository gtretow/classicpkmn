const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const modal = document.getElementById("pokemonDetailModal");
const modalOverlay = document.getElementById("modalOverlay");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
         <li class="pokemon ${
           pokemon.type
         }" onClick='openModal(${JSON.stringify(pokemon)})'>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function convertPokemonDetailToHTML(pokemon) {
  return `
        <div class="modal-detail">
            <button onclick="closeModal()">Fechar</button>
            <div class="modal-image-container">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <div class="info">
                <span class="modal-number">#${pokemon.id}</span>
                <h3 class="modal-name">${pokemon.name}</h3>
                <ol class="modal-types">
                    ${pokemon.types
                      .map(
                        (type) => `<li class="modal-type ${type}">${type}</li>`
                      )
                      .join("")}
                </ol>
                <p class="modal-height">Height: ${pokemon.height} m</p>
                <p class="modal-weight">Weight: ${pokemon.weight} kg</p>
                <div class="modal-stats">
                    <h4>Stats:</h4>
                    <ul>
                        ${pokemon.stats
                          .map((stat) =>
                            stat.stat && stat.base_stat !== undefined
                              ? `<li>${stat.stat.name}: ${stat.base_stat}</li>`
                              : `<li>Stat unavailable</li>`
                          )
                          .join("")}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function openModal(pokemon) {
  modal.classList.remove("close");
  modalOverlay.classList.remove("close");
  modal.classList.add("open");
  modalOverlay.classList.add("open");
  console.log(pokemon);
  const modalInfo = convertPokemonDetailToHTML(pokemon);
  modal.innerHTML = modalInfo;
}

function closeModal() {
  modal.classList.remove("open");
  modalOverlay.classList.remove("open");
  modal.classList.add("close");
  modalOverlay.classList.add("close");
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

modalOverlay.addEventListener("click", closeModal);
