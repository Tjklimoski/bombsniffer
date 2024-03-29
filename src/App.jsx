import { useState, useEffect, useCallback } from "react";
import Score from "./components/Score";
import Settings from "./components/Settings";
import Tile from "./components/Tile";
import {
  TILE_STATUS,
  MESSAGE_STATUS,
  NUMBER_OF_MINES,
  createTiles,
  revealTile,
  toggleFlag,
  checkWinLoss,
  revealAll,
} from "./util/bombsniffer";

function App() {
  const [activeBombs, setActiveBombs] = useState(NUMBER_OF_MINES);
  const [tiles, setTiles] = useState(createTiles(activeBombs));
  const [message, setMessage] = useState(MESSAGE_STATUS.SCORE);

  function resetBoard(inputBombCount) {
    setActiveBombs(inputBombCount);
    setTiles(createTiles(inputBombCount));
    setMessage(MESSAGE_STATUS.SCORE);
  }

  // Used in useEffect once a win/loss state is achieved
  const preventProp = useCallback(e => {
    e.stopImmediatePropagation();
  }, []);

  //reveal all tiles if player won or loss, prevent clicks propegating
  useEffect(() => {
    const board = document.querySelector(".board");

    if (message === MESSAGE_STATUS.WIN || message === MESSAGE_STATUS.LOSS) {
      setTiles(currentTiles => revealAll(currentTiles));
      board.addEventListener("click", preventProp, { capture: true });
      board.addEventListener("contextmenu", preventProp, { capture: true });
    }

    if (message === MESSAGE_STATUS.SCORE) {
      board.removeEventListener("click", preventProp, { capture: true });
      board.removeEventListener("contextmenu", preventProp, { capture: true });
    }
  }, [message, preventProp]);

  //check for win/loss when tiles change, set message state accordingly
  useEffect(() => {
    setMessage(currentMessage => checkWinLoss(currentMessage, tiles));
  }, [tiles]);

  //set number of mines left on board based off of user's flagged tiles count.
  //passed to Score componenet
  const minesLeft = useCallback(() => {
    const numberOfFlags = tiles.filter(tile => {
      return tile.status === TILE_STATUS.FLAG;
    }).length;
    return activeBombs - numberOfFlags;
  }, [tiles, activeBombs]);

  //handles left click by user, which will reveal the tile clicked.
  const handleClick = useCallback(
    e => {
      const clickedTileId = e.target.dataset.id;
      //only allow tiles that are hidden to trigger re-render of tiles state.
      //prevents a tile with a user marked flag to be revealed
      if (
        tiles.some(
          tile => tile.id === clickedTileId && tile.status !== TILE_STATUS.HIDE
        )
      )
        return;
      if (clickedTileId == null) return;
      setTiles(currentTiles => revealTile(clickedTileId, currentTiles));
    },
    [tiles]
  );

  //handle right click by users, which will toggle the flag on the tile.
  const handleContextMenu = useCallback(
    e => {
      e.preventDefault();
      const clickedTileId = e.target.dataset.id;
      //prevent tiles state rerender if tile status is show or mine.
      if (
        tiles.some(
          tile =>
            tile.id === clickedTileId &&
            !(
              tile.status === TILE_STATUS.HIDE ||
              tile.status === TILE_STATUS.FLAG
            )
        )
      )
        return;
      if (clickedTileId == null) return;
      setTiles(currentTiles => toggleFlag(clickedTileId, currentTiles));
    },
    [tiles]
  );

  //Creates left and right click event listeners on component mount.
  useEffect(() => {
    const board = document.querySelector(".board");
    board.addEventListener("click", handleClick);
    board.addEventListener("contextmenu", handleContextMenu);

    return () => {
      board.removeEventListener("click", handleClick);
      board.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handleClick, handleContextMenu]);

  return (
    <>
      <h1 className="title">Bombsniffer</h1>
      <Score message={message} minesLeft={minesLeft()} />
      <Settings resetBoard={resetBoard} activeBombs={activeBombs} />
      <div className="board">
        {tiles.map(tile => (
          <Tile key={tile.id} {...tile} />
        ))}
      </div>
      <p className="tip">Tip: Right click on a tile to flag a potential bomb</p>
    </>
  );
}

export default App;
