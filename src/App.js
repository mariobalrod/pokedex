import React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';

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
      {console.log(data)}
      {
      
        isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <ul>
            {data.results.map((pokemon, index) => (
              <li key={index}>
                {pokemon.name}
              </li>
            ))}
          </ul>
        )

      }

      { 

        !isLoading ? (
          <div>
            <button
              onClick={() => setPage(page => page - 20)}
              disabled={prev === null}
            >
              Prev Page
            </button>

            <button
              onClick={() => setPage(page => page + 20)}
              disabled={next === null}
            >
              Next Page
            </button>
          </div>
        ) : (
          ''
        )
      
      }

    </div>
  );

}
