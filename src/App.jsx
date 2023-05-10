import { useState, useEffect, useCallback } from 'react';
import Score from "./components/Score";
import Tile from "./components/Tile";
import { TILE_STATUS, createTiles, revealTile, flagTile } from "./util/minesweeper";

const NUMBER_OF_MINES = 10;

function App() {

  const [tiles, setTiles] = useState(createTiles(NUMBER_OF_MINES));
  
  console.log('tiles after useState: ', tiles);

  function handleClick(e) {
    const clickedTileId = e.target.dataset.id;
    if (clickedTileId == null) return;
    setTiles(currentTiles => revealTile(clickedTileId, currentTiles));
  }

  function handleContextMenu(e) {
    e.preventDefault();
    const clickedTileId = e.target.dataset.id;
    console.log('id: ', clickedTileId)
    if (clickedTileId == null) return;
    setTiles((currentTiles) => flagTile(clickedTileId, currentTiles));
  }

  useEffect(() => {
    const board = document.querySelector('.board')
    board.addEventListener('click', handleClick)
    board.addEventListener('contextmenu', handleContextMenu);

    return () => {
      board.removeEventListener('click', handleClick);
    }
  }, [])

  return (
    <>
      <h1 className="title">Minesweeper</h1>
      <Score />
      <div className="board">
        {tiles.map(tile => <Tile key={tile.id} {...tile} />)}
      </div>
    </>
  );
}

export default App

//React:
//State to manage tiles
//Mines Left count will be managed by tiles state.
//event handlers for left click (show) and right click (flag)
//state for score text (win loss)

//Logic:
//process win loss