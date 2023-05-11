const BOARD_SIZE = 10;

export const TILE_STATUS = {
  HIDE: 'hide',
  MINE: 'mine',
  FLAG: 'flag',
  SHOW: 'show'
}

export const MESSAGE_STATUS = {
  SCORE: "score",
  WIN: "win",
  LOSS: "loss",
};

export function createTiles(numberOfMines) {
  const tiles = [];
  const mines = getMines(numberOfMines);

  //from top to bottome and left to right
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

  //set value property on each tile (mine proximity)
  tiles.forEach(tile => {
    const adjacentTiles = getAdjacentTiles(tile, tiles);
    let value = adjacentTiles.filter((tile) => tile.mine === true).length;
    if (value === 0) value = null;
    tile.value = value;
  })

  return tiles;
}


export function revealTile(clickedTileId, tiles) {
  let newTiles = [];
  createNewTilesArray(clickedTileId, tiles, newTiles);

  return tiles.map(tile => {
    const newTile = newTiles.find(newTile => newTile.id === tile.id)
    if (newTile) return newTile;
    return tile;
  })
}

export function toggleFlag(clickedTileId, tiles) {
  return tiles.map((tile) => {
    if (tile.id !== clickedTileId) return tile;
    if (tile.status === TILE_STATUS.FLAG) return { ...tile, status: TILE_STATUS.HIDE };
    if (tile.status !== TILE_STATUS.HIDE) return tile;
    return { ...tile, status: TILE_STATUS.FLAG };
  });
}

export function checkWinLoss(currentMessage, tiles) {
  //to stop message from changing when all tiles are revealed on win or loss
  if (currentMessage !== MESSAGE_STATUS.SCORE) return currentMessage;
  
  //loss condition:
  if (tiles.some(tile => {
    return tile.status === TILE_STATUS.MINE
  })) return MESSAGE_STATUS.LOSS;

  //win condition:
  if (tiles.every(tile => {
    return (
      tile.status === TILE_STATUS.SHOW ||
      (tile.mine &&
        (tile.status === TILE_STATUS.HIDE || tile.status === TILE_STATUS.FLAG))
    );
  })) return MESSAGE_STATUS.WIN;

  //default return
  return MESSAGE_STATUS.SCORE;
}

export function revealAll(tiles) {
  return tiles.map(tile => {
    if (tile.mine === true) return { ...tile, status: TILE_STATUS.MINE };
    return { ...tile, status: TILE_STATUS.SHOW };
  })
}


function createNewTilesArray(clickedTileId, tiles, newTiles) {
  tiles.forEach(tile => {
    if (tile.id === clickedTileId) {
      if (tile.mine === true) return newTiles.push({ ...tile, status: TILE_STATUS.MINE });
      if (tile.value === null) {
        newTiles.push({ ...tile, status: TILE_STATUS.SHOW });
        const adjacentTiles = getAdjacentTiles(tile, tiles);
        adjacentTiles.forEach((tile) => {
          if (newTiles.some((t) => t.id === tile.id)) return;
          createNewTilesArray(tile.id, tiles, newTiles);
        });
        return;
      }
      return newTiles.push({ ...tile, status: TILE_STATUS.SHOW });
    }
  })
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
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const y = tile.y + yOffset
      const x = tile.x + xOffset
      tiles.forEach(t => {
        if (t.x === tile.x && t.y === tile.y) return;
        if (t.x === x && t.y === y) adjacentTiles.push(t);
      })
    }
  }

  return adjacentTiles;
}