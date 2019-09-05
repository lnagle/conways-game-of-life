import logUpdate from 'log-update'

const displayBoard = (board: string[][], cycleNumber: number) => {
  const boardString = board.reduce((boardAcc: string, row: string[]) => boardAcc + getRowString(row) + '\n', '');
  const boardMetadata = getBoardMetadata(board, cycleNumber)
  logUpdate(boardString + boardMetadata);
}

const getRowString = (row: string[]) =>
  row.reduce((rowAcc: string, cell: string) => rowAcc += cell, '');

const getBoardMetadata = (board: string[][], cycleNumber: number) =>
  `Rows: ${board.length} | Columns: ${board[0].length} | Cycles: ${cycleNumber}`


export default displayBoard;