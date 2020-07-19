import React from 'react';

import '../styles/card.css';
import PokeballCard from '../svg/pokeballCard.svg';

export default function PokemonCard (props) {

    const [ typesNames, setTypesNames ] = React.useState([]);

    React.useEffect(() => {
        setNames(props.data.types);
    }, [props.data]);

    const setNames = (types) => {
        const temp = [];
        for (let i = 0; i<types.length; i++) {
            const name = types[i].type.name;
            temp.push(name);
        }
        setTypesNames(temp);
    }

    const { id, name, sprites } = props.data;

    return(
        <div className="card" onClick={() => { props.showOverview(props.data)} }>
            <div className="foreground">
                <div className="section1">
                    <h1 className="name">{name}</h1>
                    <h2 className="number">
                        {'#'+id.toString().padStart(3, "0")}
                    </h2>
                </div>
                <div className="section2">
                    <img className="image" src={sprites.front_default} alt="pokemon" />
                    <div className="subsection">
                            {
                                typesNames.map((name, i) => {
                                    return (
                                        <div className="chip" key={i}>
                                            <h4 className="chipText">{name}</h4>
                                        </div>
                                    );
                                })
                            
                            }
                    </div>
                </div>
            </div>
            <img className="pokeballCard" src={PokeballCard} alt="pokeball2" />
        </div>
    );
}