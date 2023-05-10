const BOARD_SIZE = 10;

export const TILE_STATUS = {
  HIDE: 'hide',
  MINE: 'mine',
  FLAG: 'flag',
  SHOW: 'show'
}

export function createTiles(numberOfMines) {
  const tiles = [];
  const mines = getMines(numberOfMines);

  //from top to bottome, from left to right
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const id = parseInt(`${y}${x}`);
      tiles.push({
        id,
        x,
        y,
        mine: mines.includes(id),
        status: TILE_STATUS.HIDE,
        value: null
      });
    }
  }

  return tiles;
}


function getMines(numberOfMines) {
  const mines = [];

  while (mines.length < numberOfMines) {
    let newPos = Math.floor(Math.random() * BOARD_SIZE**2)
    if (mines.some(pos => pos === newPos)) continue;
    mines.push(newPos);
  }

  return mines;
}