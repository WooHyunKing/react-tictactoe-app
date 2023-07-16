import React, { Component, useState } from "react";
import Square from "./Square";
import "./Board.css";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turnX, setTurnX] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const status = `Next player : ${turnX ? "X" : "O"}`;

  const handleClick = (i) => {
    if (gameOver || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = turnX ? "X" : "O";
    setSquares(newSquares);
    setTurnX((prev) => !prev);
    console.log(newSquares);
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

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div>
      <div className="status">
        {gameOver ? `Winner : ${turnX ? "O" : "X"}` : status}
      </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;

// class Board extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       squares: Array(9).fill(null),
//     };
//   }

//   renderSquare(i) {
//     return (
//       <Square
//         value={this.state.squares[i]}
//         onClick={() => this.handleClick(i)}
//       />
//     );
//   }

//   handleClick(i) {
//     const squares = this.state.squares.slice();
//     squares[i] = "X";
//     this.setState({ squares: squares });
//   }

//   render() {
//     const status = "Next player : X";
//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }
