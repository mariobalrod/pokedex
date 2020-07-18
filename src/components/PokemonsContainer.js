import React from 'react';

import PokemonCard from './PokemonCard';

import '../styles/container.css';

export default function PokemonsContainer (props) {

    return(
        <div className="column">
            <div className="row">
                {props.pokemons.map((pokemon) => <PokemonCard key={pokemon.url} name={pokemon.name} />)}
            </div>
        </div>
    );
}