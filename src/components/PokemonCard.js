import React from 'react';

import '../styles/card.css';

export default function PokemonCard (props) {

    return(
        <div className="card">
            <div className="foreground">
                <div className="section1">
                    <h1 className="name">{props.name}</h1>
                    <h2 className="number">#000</h2>
                </div>
                <div className="section2">
                    {/* <img className="image" alt="image" /> */}
                    <div className="subsection">
                        <div className="chip">
                            <h2 className="chipText">ability</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}