import { useEffect, useState, useCallback } from 'react';
import CustomCard from '../components/CustomCard';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import CustomTable from '../components/CustomTable';

function Pokedex() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [offset, setOffset] = useState<number>(6);

  const fetchPokemonData = useCallback(async () => {
    const api = new PokemonClient();
    try {
      const limit = 6;
      const response = await api.listPokemons(limit, offset);
      const fetchedData = await Promise.all(
        response.results.map(async (pokemon) => {
          const pokemonData = await api.getPokemonByName(pokemon.name);
          return pokemonData;
        })
      );
      setPokemonData((prevData) => [...prevData, ...fetchedData]);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  }, [offset]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  const handleCardClick = (pokemon: Pokemon | null) => {
    setSelectedPokemon(pokemon);
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 6);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center ">
      <div className="grid grid-cols-3 gap-4">
        {pokemonData.map((pokemon) => (
          <CustomCard
            key={pokemon.name}
            name={pokemon.name}
            imageUrl={pokemon.sprites.front_default ?? 'placeholder-image-url'}
            types={pokemon.types.map((typeObj) => typeObj.type.name)}
            onClick={() => handleCardClick(pokemon)}
          />
        ))}
      </div>
      {selectedPokemon && (
        <div className="mt-4">
          <CustomTable data={[selectedPokemon]} />
        </div>
      )}
      <div className="div">
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default Pokedex;
