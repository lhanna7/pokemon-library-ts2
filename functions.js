
const ul = document.querySelector("ul")
const pokemonListing = document.querySelector("#pokemon-listing")

function addPokemon(pokemon) {
    const div = document.createElement("div")
    div.innerHTML = `
    <figure>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
    <figcaption><a href="pokemon.html?pokemon=${pokemon.name}">${pokemon.name}</a></figcaption>
    </figure>
    `
    if(pokemonListing !== null) {
        pokemonListing.append(div)
    }
}

function addAbilities(pokemon) {
    const li = document.createElement("li")

    li.innerHTML = `
    <span class="ability-name">${pokemon.name}</span>
    <br>
    <span class="ability-short-description">${pokemon.effect_entries[1].short_effect}</span>
    `
    if(ul !== null) {
        ul.append(li)
    }
}

export { addPokemon, addAbilities }