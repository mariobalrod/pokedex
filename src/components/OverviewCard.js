import React from 'react';

import '../styles/overviewcard.css';

export default function OverviewCard (props) {

    const COLORS_TYPES = {
        bug: 'B1C12E',
        dark: '4F3A2D',
        dragon: '755EDF',
        electric: 'FCBC17',
        fairy: 'F4B1F4',
        fighting: '823551D',
        fire: 'E73B0C',
        flying: 'A3B3F7',
        ghost: '6060B2',
        grass: '74C236',
        ground: 'D3B357',
        ice: 'A3E7FD',
        normal: 'C8C4BC',
        poison: '934594',
        psychic: 'ED4882',
        rock: 'B9A156',
        steel: 'B5B5C3',
        water: '3295F6'
    };

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

    const { name, id, sprites, weight, height } = props.data;

    return (
        <div className="cardOverview">
            <div className="content">
                <div className="box1">
                    <h1 className="nameOverview">{name+'   #'+id.toString().padStart(3, "0")}</h1>
                    <img className="overviewImage" src={sprites.front_default} alt="pokemonn"/>
                    <div className="atribSection">
                        <div className="atrib">
                            <p>Weight: </p>
                            <p>{(weight/10) + ' kg'}</p>
                        </div>
                        <div className="atrib">
                            <p>Height: </p>
                            <p>{(height/10) + ' m'}</p>
                        </div>
                    </div>
                </div>
                <div className="box2">
                    <div className="subtitle" style={{marginTop: 15, marginBottom: 6}}>Types:</div>
                    <div className="typesSection">
                        {
                            typesNames.map( (name, i) => (
                                <span
                                    key={i}
                                    className="typesElements"
                                    style={{
                                        backgroundColor: `#${COLORS_TYPES[name]}`,
                                        color: 'white'
                                    }}
                                >
                                    {name}
                                </span>
                            ))
                        }
                    </div>
                    <div className="subtitle" style={{marginTop: 15, marginBottom: 6}}>Stats:</div>
                </div>
            </div>
        </div>
    );
}