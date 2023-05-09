

function App() {
  

  return (
    <>
      <h1 className="title">Minesweeper</h1>
      <div className="score">Mines Left: 10</div>
      <div className="board">
        <div className="tile" data-status="hide"></div>
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
