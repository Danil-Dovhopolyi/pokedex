import { Pokemon } from 'pokenode-ts';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';
import { getPokemonPropertyValue } from '../helpers/getPokemonPropertyValue';
import React from 'react';

interface CustomTableProps {
  data: Pokemon[];
}

const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
  const properties = [
    { label: 'Types', accessor: 'types' },
    { label: 'Attack', accessor: 'attack' },
    { label: 'Defense', accessor: 'defense' },
    { label: 'HP', accessor: 'hp' },
    { label: 'Special Attack', accessor: 'special-attack' },
    { label: 'Special Defense', accessor: 'special-defense' },
    { label: 'Speed', accessor: 'speed' },
    { label: 'Weight', accessor: 'weight' },
  ];

  return (
    <TableContainer component={Paper} className="max-w-md">
      <Table aria-label="custom table">
        <TableBody>
          {data.map((pokemon) => (
            <React.Fragment key={pokemon.name}>
              <TableRow>
                <TableCell colSpan={2} className="font-medium">
                  {pokemon.name}
                </TableCell>
              </TableRow>
              {properties.map((property) => (
                <TableRow key={property.accessor}>
                  <TableCell className="font-medium">
                    {property.label}
                  </TableCell>
                  <TableCell>
                    {getPokemonPropertyValue(
                      pokemon,
                      property.accessor as keyof Pokemon
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
