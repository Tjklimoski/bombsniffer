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
      const id = `${y}${x}`;
      tiles.push({
        id,
        x,
        y,
        mine: mines.includes(parseInt(id)),
        status: TILE_STATUS.HIDE,
        value: null
      });
    }
  }

  return tiles;
}


export function revealTile(clickedTileId, tiles) {
  return tiles.map((tile) => {
    if (tile.id !== clickedTileId) return tile;
    if (tile.mine === true) return { ...tile, status: TILE_STATUS.MINE };
    //Set tile value for mine proximity
    const adjacentTiles = getAdjacentTiles(tile, tiles);
    // const mineProxCount = adjacentTiles.filter(
    //   (tile) => tile.mine === true
    // ).length;
    //recursive if value is null (not near a mine)
    return { ...tile, status: TILE_STATUS.SHOW };
  });
}

export function flagTile(clickedTileId, tiles) {
  return tiles.map((tile) => {
    if (tile.id !== clickedTileId) return tile;
    if (tile.status === TILE_STATUS.FLAG) return { ...tile, status: TILE_STATUS.HIDE };
    if (tile.status !== TILE_STATUS.HIDE) return tile;
    return { ...tile, status: TILE_STATUS.FLAG };
  });
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

function getAdjacentTiles(tile, tiles) {
  let adjacentTiles = []

  //pull the adjacent tiles
  for (let xOffset = -1; xOffset <= 1; x++) {
    for (let yOffset = -1; yOffset <= 1; y++) {
      const x = tile.x + xOffset;
      const y = tile.y + yOffset;
      adjacentTiles = tiles.filter((t) => {
        //remove the current tile from the adjacent tiles
        if (t.x === tile.x && t.y === tile.y) return false;
        return t.x === x && t.y === y;
      });
    }
  }

  return adjacentTiles
}