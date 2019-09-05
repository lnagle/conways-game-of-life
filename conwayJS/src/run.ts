import { isEqual, isString } from 'lodash';

import displayBoard from './displayBoard';
import {
  filterNeighborCoordinates,
  getLiveNeighborCount,
  getNeighborCoordinates,
  getNewCellValue,
  generateBoard,
  seedBoard
} from './utils';
import { CoordinatesTuple } from './types'

const rPentomino = '[[51, 20], [52, 20], [50, 21], [51, 21], [51, 22]]'

const run = (x: number, y: number, seed: string = rPentomino) => {
  const parsedSeed = JSON.parse(seed) as CoordinatesTuple[];
  const blankBoard = generateBoard(x, y);
  const seededBoard = seedBoard(blankBoard, parsedSeed);
  nextCycle(seededBoard, 1);
}


const nextCycle = (oldBoard: string[][], cycleNumber: number) => {
  const newBoard = oldBoard.map((row, y) =>
    row.map((cell, x) => {
      const neighborCoordinates = getNeighborCoordinates(x, y);
      const validNeighborCoordinates = filterNeighborCoordinates(neighborCoordinates, oldBoard);
      const liveNeighborCount = getLiveNeighborCount(validNeighborCoordinates, oldBoard);

      return getNewCellValue(cell, liveNeighborCount);
    })
  );


  if (isEqual(newBoard, oldBoard)) {
    process.exit();
  } else {
    displayBoard(newBoard, cycleNumber);

    setTimeout(() => {
      nextCycle(newBoard, cycleNumber + 1);
    }, 100);
  }
}


export default run;