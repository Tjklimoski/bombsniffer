import Score from "./components/Score";
import Tile from "./components/Tile";

const TILE_STATUS = {
  HIDE: 'hide',
  MINE: 'mine',
  FLAG: 'flag',
  SHOW: 'show'
}

function App() {
  

  return (
    <>
      <h1 className="title">Minesweeper</h1>
      <Score />
      <div className="board">
        <Tile status={TILE_STATUS.HIDE}/>
        <div className="tile" data-status="mine"></div>
        <div className="tile" data-status="flag"></div>
        <div className="tile" data-status="show">1</div>
        <div className="tile" data-status="show">2</div>
        <div className="tile" data-status="show">3</div>
        <div className="tile" data-status="show"></div>
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