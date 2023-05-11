import { useState, useEffect, useCallback } from 'react';
import Score from "./components/Score";
import Tile from "./components/Tile";
import {
  TILE_STATUS,
  MESSAGE_STATUS,
  createTiles,
  revealTile,
  toggleFlag,
  checkWinLoss,
  revealAll
} from "./util/minesweeper";

const NUMBER_OF_MINES = 10;

function App() {

  const [tiles, setTiles] = useState(createTiles(NUMBER_OF_MINES));
  const [message, setMessage] = useState(MESSAGE_STATUS.SCORE);

  useEffect(() => {
    if (message === MESSAGE_STATUS.WIN || message === MESSAGE_STATUS.LOSS) {
      setTiles(currentTiles => revealAll(currentTiles))
    }
  }, [message])

  useEffect(() => {
    setMessage(currentMessage => checkWinLoss(currentMessage, tiles));
  }, [tiles])

  const minesLeft = useCallback(() => {
    return NUMBER_OF_MINES - tiles.filter((tile) => {
      return tile.status === TILE_STATUS.FLAG;
    }).length;
  }, [tiles])
  
  console.log('tiles after useState: ', tiles);

  function handleClick(e) {
    const clickedTileId = e.target.dataset.id;
    console.log(e.target.dataset.status);
    if (clickedTileId == null) return;
    setTiles(currentTiles => revealTile(clickedTileId, currentTiles));
  }

  function handleContextMenu(e) {
    e.preventDefault();
    const clickedTileId = e.target.dataset.id;
    if (clickedTileId == null) return;
    setTiles((currentTiles) => toggleFlag(clickedTileId, currentTiles));
  }

  useEffect(() => {
    const board = document.querySelector('.board')
    board.addEventListener('click', handleClick)
    board.addEventListener('contextmenu', handleContextMenu);

    return () => {
      board.removeEventListener('click', handleClick);
      board.removeEventListener("contextmenu", handleContextMenu);
    }
  }, [])

  return (
    <>
      <h1 className="title">Minesweeper</h1>
      <Score message={message} minesLeft={minesLeft()} />
      <div className="board">
        {tiles.map((tile) => (
          <Tile key={tile.id} {...tile} />
        ))}
      </div>
    </>
  );
}

export default App

//React:
//Have win loss stop interactiviy on board

//refactor:
//state still updates when left clicked or right clicked on an already shown tile
