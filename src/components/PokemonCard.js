import React from 'react';

import '../styles/card.css';

export default function PokemonCard (props) {

    return(
        <div className="card">
            <div className="foreground">
                <div className="section1">
                    <h1 className="name">{props.data.name}</h1>
                    <h2 className="number">{'#'+props.data.id.toString().padStart(3, "0")}</h2>
                </div>
                <div className="section2">
                    <img className="image" src={props.data.sprites.front_default} alt="pokemon" />
                    <div className="subsection">
                        <div className="chip">
                            {
                                props.data.types.map((type, i) => <h4 key={i} className="chipText">{type.type.name}</h4>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}