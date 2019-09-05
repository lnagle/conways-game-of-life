import { CoordinatesTuple } from './types'

const DEAD = '.';
const ALIVE = '#';

export const generateBoard = (x: number, y: number) => 
  Array(y).fill(Array(null)).map(() => Array(x).fill(DEAD));

export const seedBoard = (board: string[][], seed: CoordinatesTuple[]) => {
  const rowLength = board[0].length;
  const columnHeight = board.length;

  seed.forEach(([x, y], i) => {
    if (x < 0 || x > rowLength || y < 0 || y > columnHeight) {
      throw `
============================================

ERROR:
Invalid seed input!

Board Length: ${rowLength}
Board Height: ${columnHeight}

Seed x: ${x}
Seed y: ${y}
Seed Index: ${i}

All x coordinates must be between 0 and board length, inclusive.
All y coordinates must be between 0 and board height, inclusive.

Please fix your seed input and try starting the game again. 

============================================
      `
    }

    board[y][x] = ALIVE;
  });

  return board;
}

export const getNeighborCoordinates = (x: number, y: number) =>
  [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],

    [x - 1, y],
    [x + 1, y],

    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ] as CoordinatesTuple[];


/**
 * Removes invalid neighbors. 
 * 
 * Ex: Given getNeighborCoordinates(0,0), five of the eight returned tuples will be invalid and should therefore be removed.
 */
export const filterNeighborCoordinates = (neighborCoordinates: CoordinatesTuple[], board: string[][]) => 
  neighborCoordinates.filter(([x, y]) => board[y] && board[y][x]);


export const getLiveNeighborCount = (validNeighborCoordinates: CoordinatesTuple[],  oldBoard: string[][]) => 
  validNeighborCoordinates.reduce((acc: number, [x, y]: CoordinatesTuple) => oldBoard[y][x] === ALIVE ? acc += 1 : acc, 0);


export const getNewCellValue = (cell: string, liveNeighborCount: number) => {
  if (cell === DEAD && liveNeighborCount === 3) {
    return ALIVE;
  }

  if (cell === ALIVE && (liveNeighborCount === 2 || liveNeighborCount === 3)) {
    return ALIVE;
  }

  return DEAD;
}