const BOARD_SIZE = 10;

export const TILE_STATUS = {
  HIDE: 'hide',
  MINE: 'mine',
  FLAG: 'flag',
  SHOW: 'show'
}

export function createTiles(numberOfMines) {
  const tiles = [];

  //from top to bottome, from left to right
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      tiles.push({x, y, mine: false, status: TILE_STATUS.HIDE});
    }
  }

  return tiles;
}