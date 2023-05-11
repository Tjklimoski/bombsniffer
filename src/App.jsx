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
} from "./util/bombsniffer";

const NUMBER_OF_MINES = 10;

function App() {

  const [tiles, setTiles] = useState(createTiles(NUMBER_OF_MINES));
  const [message, setMessage] = useState(MESSAGE_STATUS.SCORE);

  console.log(tiles);

  //reveal all tiles if player won or loss
  useEffect(() => {
    if (message === MESSAGE_STATUS.WIN || message === MESSAGE_STATUS.LOSS) {
      setTiles(currentTiles => revealAll(currentTiles))
    }
  }, [message])

  //check for win/loss when tiles change, set messagae state accordingly
  useEffect(() => {
    setMessage(currentMessage => checkWinLoss(currentMessage, tiles));
  }, [tiles])

  //set number of mines left on board based off of user's flagged tiles count.
  //passed to Score componenet
  const minesLeft = useCallback(() => {
    const numberOfFlags = tiles.filter((tile) => {
      return tile.status === TILE_STATUS.FLAG;
    }).length;
    return NUMBER_OF_MINES - numberOfFlags;
  }, [tiles])

  //handles left click by user, which will reveal the tile clicked.
  function handleClick(e) {
    const clickedTileId = e.target.dataset.id;
    if (clickedTileId == null) return;
    setTiles(currentTiles => revealTile(clickedTileId, currentTiles));
  }

  //handle right click by users, which will toggle the flag on the tile.
  function handleContextMenu(e) {
    e.preventDefault();
    const clickedTileId = e.target.dataset.id;
    if (clickedTileId == null) return;
    setTiles((currentTiles) => toggleFlag(clickedTileId, currentTiles));
  }

  //Creates left and right click event listeners on component mount.
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
      <h1 className="title">Bombsniffer</h1>
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
