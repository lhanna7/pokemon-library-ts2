const pokemon = document.querySelector("#pokemon")
const spinner = document.querySelector(".spinner")
const pokemonDetails = document.querySelector("#pokemon-details")
const ul = document.querySelector("ul")
const main = document.querySelector("main")


type ChosenPokemon = {
    name: string;
    results: {
        name: string;
        url: string;
        sprites: {
            front_default: string;
        }
    }[];
    sprites: {
        front_default: string;
    }
    effect_entries: {
        short_effect: string;
    }[];
    abilities: {
        ability: {
            url: string;
        };
    }[];
}

function addPokemon(pokemon: ChosenPokemon) {
    const div = document.createElement("div")
    div.innerHTML = `
    <figure>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
    <figcaption><a href="pokemon.html?pokemon=${pokemon.name}">${pokemon.name}</a></figcaption>
    </figure>
    `
    if (pokemonDetails !== null) {
        pokemonDetails.append(div)
    }
}

function addAbilities(pokemon: ChosenPokemon) {
    const li = document.createElement("li")

    li.innerHTML = `
    <span class="ability-name">${pokemon.name}</span>
    <br>
    <span class="ability-short-description">${pokemon.effect_entries[1].short_effect}</span>
    `
    if (ul !== null) {
        ul.append(li)
    }
}

const backButton = document.createElement("table")
backButton.classList.add("back-button")
backButton.innerHTML = `<a href="index.html">Back to List</a>`
if (main !== null) {
    main.append(backButton)
}


const queryString = new URLSearchParams(window.location.search)

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then((parsedResponse: ChosenPokemon) => {
        console.log(parsedResponse)
        addPokemon(parsedResponse)
        return Promise.all(parsedResponse.abilities
            .map(parsedResponse => parsedResponse.ability.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            }))
    }).then(parsedResponses => {
        if (spinner !== null) {
            spinner.classList.add("hidden")
        }
        parsedResponses.forEach(parsedResponse => {
            addAbilities(parsedResponse)
        })
    })

export default {}