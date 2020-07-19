import React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';

import PokemonsContainer from './components/PokemonsContainer';

import './styles/main.css';

//Time out
axios.defaults.timeout = 2000;

export default function App () {

  const [ page, setPage ] = React.useState(0);
  const [ next, setNext ] = React.useState();
  const [ prev, setPrev ] = React.useState();

  const { data, isLoading, error } = useQuery (
    ['pokemons', {page}], 
    async () => {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=10`);

      // Limits for Pagination
      const {next} = data;
      setNext(next);
      const {previous} = data;
      setPrev(previous);

      const { results } = data;

      const helper = [];

      for (let i = 0; i < results.length; i++) {
        const pokemon = await axios.get(results[i].url);
        helper.push(pokemon.data);
      }

      return helper;
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
          <div className="loading"></div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <PokemonsContainer pokemons={data} />
        )

      }

      { 

        !isLoading ? (
          <div className="buttonsContainer">
            <button
              className="button"
              onClick={() => setPage(page => page - 10)}
              disabled={prev === null}
            >
              {'<'}
            </button>

            <button
              className="button"
              onClick={() => setPage(page => page + 10)}
              disabled={next === null}
            >
              {'>'}
            </button>
          </div>
        ) : (
          ''
        )
      
      }

    </div>
  );

}
