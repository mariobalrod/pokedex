import React from 'react';

import PokemonCard from './PokemonCard';

import '../styles/container.css';

export default function PokemonsContainer (props) {

    return(
        <div className="column">
            <div className="row">
                {
                    props.pokemons.map((pokemon, i) => {
                        return (<PokemonCard key={i} data={pokemon} showOverview={props.showOverview} />)
                    })
                }
            </div>
        </div>
    );
}