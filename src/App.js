import React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';

import PokemonsContainer from './components/PokemonsContainer';
import SearchBar from './components/SearchBar';
import OverviewCard from './components/OverviewCard';

import './styles/main.css';
import PokeballHome from './svg/pokeballHome.svg';

//Time out
axios.defaults.timeout = 2000;

export default function App () {

  const [ page, setPage ] = React.useState(0);
  const [ next, setNext ] = React.useState();
  const [ prev, setPrev ] = React.useState();

  //Search
  const [ searchTerm, setSearchTerm ] = React.useState('');
  const [ searchResult, setSearchResult ] = React.useState([]);

  //Overview 
  const [ show, setShow ] = React.useState(false);
  const [ pokemonOverview, setPokemonOverview ] = React.useState(null);

  const { data, isLoading, error } = useQuery (
    ['pokemons', {page}], 
    async () => {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=10`);
      // Limits for Pagination Controllers
      const {next} = data;
      setNext(next);
      const {previous} = data;
      setPrev(previous);
      // Modify data to an Array with Pokemons Object
      const { results } = data;
      const helper = [];
      for (let i = 0; i < results.length; i++) {
        const pokemon = await axios.get(results[i].url);
        helper.push(pokemon.data);
      }
      return helper;
    }
  );

  // Search Bar
  const handleSubmit = (e) => {
    e.preventDefault();
    const arr = [];
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
      .then(data => {
        arr.push(data.data);
        setSearchResult(arr);
      })
      .catch(err =>  alert("Nothing found"));
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const showOverview = (pokemon) => {
    setShow(!show);
    if (pokemon !== null) {
      setPokemonOverview(pokemon)
    } else {
      setPokemonOverview(null);
    }
  }

  return (
    <div className="App">

      <img src={PokeballHome} className="pokeball" alt="pokeball"/>

      <div className="title" onClick={() => window.location.reload(true)}>
        Pokedex
      </div>

      {
        show && pokemonOverview ? (
          <React.Fragment>
            <OverviewCard showOverview={showOverview} data={pokemonOverview} />
          </React.Fragment>
        ) : (
          <React.Fragment>

            <SearchBar handleSubmit={handleSubmit} handleChange={handleChange} searchTerm={searchTerm} />
            {
              isLoading ? (
                <div className="loading"></div>
              ) : error ? (
                <div>Error: {error.message}</div>
              ) : (

                    (searchResult.length > 0) ? (
                      <PokemonsContainer pokemons={searchResult} showOverview={showOverview} />
                    ) : (
                        <PokemonsContainer pokemons={data} showOverview={showOverview} />
                      )

                  )
            }

            {/* Pagination Container */}
            {
              !isLoading && searchResult.length === 0 ? (
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
          </React.Fragment>
        )
      }

      
    </div>
  );

}
