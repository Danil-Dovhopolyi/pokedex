import { useEffect, useState, useRef } from 'react';
import CustomCard from '../components/CustomCard';
import { PokemonClient, Pokemon, NamedAPIResourceList } from 'pokenode-ts';
import CustomTable from '../components/CustomTable';
import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';
import { toast } from 'react-toastify';

function Pokedex() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [offset, setOffset] = useState<number>(API_CONFIG.initialOffset);
  const tableRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<NamedAPIResourceList>(
          `https://pokeapi.co/api/v2/pokemon?limit=${API_CONFIG.limit}&offset=${offset}`
        );
        const pokemonNames = response.data.results.map(
          (pokemon) => pokemon.name
        );
        const api = new PokemonClient();
        const fetchedData = await Promise.all(
          pokemonNames.map(
            async (name: string) => await api.getPokemonByName(name)
          )
        );
        setPokemonData((prevData) => [...prevData, ...fetchedData]);
      } catch (error) {
        toast.error('An error occurred while fetching Pokemon data.');
      }
    };

    fetchData();
  }, [offset]);

  useEffect(() => {
    if (selectedPokemon && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedPokemon]);

  const handleCardClick = (pokemon: Pokemon | null) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseTable = () => {
    setSelectedPokemon(null);
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + API_CONFIG.incrementOffset);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemonData.map((pokemon) => (
            <CustomCard
              key={pokemon.name}
              name={pokemon.name}
              imageUrl={
                pokemon.sprites?.front_default ?? 'placeholder-image-url'
              }
              types={pokemon?.types.map((typeObj) => typeObj.type.name)}
              onClick={() => handleCardClick(pokemon)}
            />
          ))}
        </div>
        {selectedPokemon && (
          <div className="m-4 " ref={tableRef}>
            <CustomTable data={[selectedPokemon]} onClose={handleCloseTable} />
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-5/12"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default Pokedex;
