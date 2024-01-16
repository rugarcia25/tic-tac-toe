/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "❌",
  O: "⚪",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null); // null = no ganador, false = ganador

  const checkWinner = (boardToCheck) => {
    // revisamos combinaciones
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    // no winner
    return null;
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    // no actualizar si existe un valor
    if (board[index] || winner) return;

    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // hay winner?
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  return (
    <>
      <main className="board">
        <h1>TRES EN RAYA</h1>
        <button onClick={resetGame}>Reset</button>
        <section className="game">
          {board.map((square, index) => {
            return (
              <>
                <Square key={index} index={index} updateBoard={updateBoard}>
                  {square}
                </Square>
              </>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        {winner !== null && (
          <>
            <section className="winner">
              <div className="text">
                <h2>{winner === false ? "Empate" : "¡Ganador!"}</h2>

                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer onClick={resetGame}>
                  <button>Volver a jugar</button>
                </footer>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default App;
