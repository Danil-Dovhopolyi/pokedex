import { Pokemon } from 'pokenode-ts';

export function getPokemonStats(pokemon: Pokemon): { [key: string]: number } {
  const statsMapping: { [key: string]: number } = {};

  for (const stat of pokemon.stats) {
    statsMapping[stat.stat.name] = stat.base_stat;
  }

  return statsMapping;
}
