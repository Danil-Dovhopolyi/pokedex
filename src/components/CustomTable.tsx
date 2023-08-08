import React from 'react';
import { Pokemon } from 'pokenode-ts';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
} from '@material-ui/core';
import { getPokemonStats } from '../helpers/getPokemonStats';
import CloseIcon from '@material-ui/icons/Close';

interface CustomTableProps {
  data: Pokemon[];
  onClose(): void;
}

const CustomTable: React.FC<CustomTableProps> = ({ data, onClose }) => {
  const statNames = [
    'attack',
    'defense',
    'special-attack',
    'special-defense',
    'speed',
    'hp',
  ];

  const firstPokemon = data[0];

  return (
    <TableContainer component={Paper}>
      <IconButton onClick={onClose} style={{ float: 'right' }}>
        <CloseIcon style={{ color: 'red' }} />
      </IconButton>
      <Table
        aria-label="custom table"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="flex flex-col items-center">
          <div>
            <img
              src={
                firstPokemon?.sprites?.front_default ?? 'placeholder-image-url'
              }
              alt={firstPokemon.name}
              width={100}
              height={100}
            />
          </div>
          <div>{firstPokemon.name}</div>
        </div>
        <TableBody>
          {statNames?.map((statName) => (
            <TableRow key={statName}>
              <TableCell>
                <div>{statName}</div>
              </TableCell>
              <TableCell>
                <div>{getPokemonStats(firstPokemon)[statName] || ''}</div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <div>Types</div>
            </TableCell>
            <TableCell>
              <div>
                {firstPokemon?.types
                  ?.map((typeObj) => typeObj.type.name)
                  .join(', ')}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div>Weight</div>
            </TableCell>
            <TableCell>
              <div>{firstPokemon.weight}</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
