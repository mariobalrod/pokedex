import React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';

import PokemonsContainer from './components/PokemonsContainer';

import './styles/main.css';

export default function App () {

  const [ page, setPage ] = React.useState(0);
  const [ next, setNext ] = React.useState();
  const [ prev, setPrev ] = React.useState();

  const { data, isLoading, error } = useQuery (
    ['pokemons', {page}], 
    async () => {
      const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=20`);

      const {next} = data;
      setNext(next);

      const {previous} = data;
      setPrev(previous);

      return data;
    }
  );

  return (
    <div className="App">

      <div className="title">
        Pokedex
      </div>

      <div className="pokeball">
        
      </div>

      {
      
        isLoading ? (
          <div className="loading">
            Loading...
          </div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <PokemonsContainer pokemons={data.results} />
        )

      }

      {/* { 

        !isLoading ? (
          <div className="buttonsContainer">
            <button
              className="button"
              onClick={() => setPage(page => page - 20)}
              disabled={prev === null}
            >
              Prev Page
            </button>

            <button
              className="button"
              onClick={() => setPage(page => page + 20)}
              disabled={next === null}
            >
              Next Page
            </button>
          </div>
        ) : (
          ''
        )
      
      } */}

    </div>
  );

}
