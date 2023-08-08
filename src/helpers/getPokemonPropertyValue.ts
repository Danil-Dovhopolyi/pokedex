import { Pokemon, Stat } from 'pokenode-ts';

export function getPokemonPropertyValue(
  pokemon: Pokemon,
  accessor: keyof Pokemon
): string | number | '' {
  const statAccessorMapping: { [key in keyof Pokemon]: string } = {
    types: 'types',
    weight: 'weight',
    special_attack: 'special-attack',
    special_defense: 'special-defense',
    total_moves: 'moves',
  };

  const statName = statAccessorMapping[accessor];

  if (statName === 'types') {
    return pokemon.types.map((typeObj) => typeObj.type.name).join(', ');
  } else if (statName === 'weight') {
    return pokemon[statName];
  } else if (statName === 'moves') {
    return pokemon.moves.length;
  } else {
    return (
      pokemon.stats.find((stat: Stat) => stat.stat.name === statName)
        ?.base_stat || ''
    );
  }
}
