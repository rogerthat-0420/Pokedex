const pokedex = document.getElementById("pokedex");
const pokemons = [];

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const promise = fetch(url)
            .then(res => res.json())
            .then(data => {
                const pokemon = {
                    id: data.id,
                    name: data.name,
                    height: data.height, 
                    weight:data.weight,
                    image: data.sprites['front_default'],
                    move: data.moves.map(move => move.move.name).join('| '),
                    ability: data.abilities.map(ability => ability.ability.name).join('|')
                };
                pokemons.push(pokemon);
                console.log(data);
            });
        promises.push(promise);
    }

    
    Promise.all(promises).then(() => {
        // Sort the pokemon array based on their IDs
        pokemons.sort((a, b) => a.id - b.id);
        displayPokemons();
    });
};

const displayPokemons = () => {
    const pokestring = pokemons.map(pokemon => `
        <li class="pokemon_card">
            <img src="${pokemon.image}" class="pokemon_image"/>
            <h2>${pokemon.name}</h2>
            <h6>Height: ${pokemon.height}</h6>
            <h6>Weight: ${pokemon.weight}</h6>
            <h6>Abilities: ${pokemon.ability}</h6>
        </li>
    `).join('');
    pokedex.innerHTML = pokestring;
};

fetchPokemon();

{/* <p>Height: ${pokemon.height}</p>
<p>Abilities: ${pokemon.ability}</p> */}