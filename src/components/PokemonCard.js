import React from 'react';

import '../styles/card.css';

export default function PokemonCard (props) {

    return(
        <div className="card">
            <h1>{props.name}</h1>
        </div>
    );
}