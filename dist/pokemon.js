"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon = document.querySelector("#pokemon");
const spinner = document.querySelector(".spinner");
const pokemonDetails = document.querySelector("#pokemon-details");
const ul = document.querySelector("ul");
const main = document.querySelector("main");
const pokemonListing = document.querySelector("#pokemon-listing");
function addPokemon(pokemon) {
    const div = document.createElement("div");
    div.innerHTML = `
    <figure>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
    <figcaption><a href="pokemon.html?pokemon=${pokemon.name}">${pokemon.name}</a></figcaption>
    </figure>
    `;
    if (pokemonListing !== null) {
        pokemonListing.append(div);
    }
}
function addAbilities(pokemon) {
    const li = document.createElement("li");
    li.innerHTML = `
    <span class="ability-name">${pokemon.name}</span>
    <br>
    <span class="ability-short-description">${pokemon.effect_entries[1].short_effect}</span>
    `;
    if (ul !== null) {
        ul.append(li);
    }
}
const backButton = document.createElement("table");
backButton.classList.add("back-button");
backButton.innerHTML = `<a href="index.html">Back to List</a>`;
if (main !== null) {
    main.append(backButton);
}
const queryString = new URLSearchParams(window.location.search);
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
    return response.json();
}).then((parsedResponse) => {
    addPokemon(parsedResponse);
    return Promise.all(parsedResponse.abilities
        .map(parsedResponse => parsedResponse.ability.url)
        .map(url => {
        return fetch(url).then(response => response.json());
    }));
}).then(parsedResponses => {
    if (spinner !== null) {
        spinner.classList.add("hidden");
    }
    parsedResponses.forEach(parsedResponse => {
        addAbilities(parsedResponse);
    });
});
exports.default = {};
