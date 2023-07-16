import "./App.css";
import Board from "./components/Board";
import { useState } from "react";

function App() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [turnX, setTurnX] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const status = gameOver
    ? `Winner : ${turnX ? "O" : "X"}`
    : `Next player : ${turnX ? "X" : "O"}`;

  const current = history[history.length - 1];

  const handleClick = (i) => {
    if (gameOver || current.squares[i]) {
      return;
    }
    const newSquares = current.squares.slice();
    newSquares[i] = turnX ? "X" : "O";

    setHistory([...history, { squares: newSquares }]);
    setTurnX((prev) => !prev);

    if (checkGameOver(newSquares)) {
      setGameOver(true);
    }
  };

  const checkGameOver = (squares) => {
    const gameOverList = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < gameOverList.length; i++) {
      const [a, b, c] = gameOverList[i];
      console.log(squares[a], squares[b], squares[c]);
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c] &&
        squares[a] === squares[c]
      ) {
        return true;
      }
    }
    return false;
  };
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          {history.map((step, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setHistory((prev) => prev.slice(0, index + 1));
                  if (gameOver && index !== history.length - 1) {
                    setGameOver(false);
                  }
                }}
              >
                {index === 0 ? "Go to game start" : `Go to move #${index}`}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
