import { useState } from 'react';
import Score from "./components/Score";
import Tile from "./components/Tile";
import { TILE_STATUS, createTiles } from "./util/minesweeper";

const NUMBER_OF_MINES = 10;

function App() {

  const [tiles, setTiles] = useState(createTiles(NUMBER_OF_MINES));
  
  console.log(tiles);

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
//create board array
//Select random tiles to be bomb
//process win loss