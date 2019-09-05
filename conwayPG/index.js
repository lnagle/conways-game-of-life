const { Client } = require('pg');
const logUpdate = require('log-update');

const client = new Client({
  database: 'conway',
});

(async () => {
  await client.connect();

  const board = await getInitialBoard()
  displayBoard(board);

  while (true) {
    const res = await triggerNextCycle();
    updateBoard(board, res.rows);
  }
})()


const getInitialBoard = async () => {
  const boardResponse = await client.query('SELECT * FROM cell ORDER BY y, x');
  
  const board = [];
  let tempArr = [];

  boardResponse.rows.forEach(cell => {
    tempArr.push(getCharacter(cell.is_alive));

    if (cell.x === 125) {
      board.push(tempArr);
      tempArr = [];
    }
  })

  return board;
}


const triggerNextCycle = async () => {
  return await client.query(`
    WITH live_neighbor_count_no_nulls AS (
      SELECT a.id, COUNT(*) 
      FROM cell a 
      CROSS JOIN (SELECT * FROM cell WHERE is_alive=true) AS b 
      WHERE (b.x IN (a.x-1, a.x, a.x+1) AND b.y IN (a.y-1, a.y, a.y+1) AND a.id != b.id)
      GROUP BY a.id
    ), live_cells_with_no_live_neighbors AS (
      SELECT a.id, (SELECT COUNT(b.id) FROM cell b WHERE (
        b.x IN (a.x-1, a.x, a.x+1) AND b.y IN (a.y-1, a.y, a.y+1)
      ) AND a.id != b.id AND b.is_alive = true)
      FROM cell a
      WHERE a.is_alive = true
    ), live_neighbor_count AS (
      SELECT * FROM live_neighbor_count_no_nulls UNION SELECT * FROM live_cells_with_no_live_neighbors
    ) UPDATE cell
      SET is_alive = (CASE 
        WHEN cell.is_alive = false AND live_neighbor_count.count IN (3) THEN true
        WHEN cell.is_alive = true AND live_neighbor_count.count IN (2, 3) THEN true
        ELSE false END)
        FROM live_neighbor_count
        WHERE cell.id = live_neighbor_count.id
        RETURNING cell.id, cell.x, cell.y, cell.is_alive;
  `);
}


const updateBoard = (board, cells) => {
  cells.forEach(cell => {
    board[cell.y - 1][cell.x - 1] = getCharacter(cell.is_alive);
  })

  displayBoard(board);
}


const getCharacter = isAlive => isAlive ? '#' : '.';


const displayBoard = board => 
  logUpdate(board.map(row => row.join('')).reduce((acc, rs) => acc + rs + '\n', ''));