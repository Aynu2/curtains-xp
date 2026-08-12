import React, { useState, useEffect } from 'react';

type Player = 'X' | 'O' | null;

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player>(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const w = calculateWinner(board);
    if (w) {
      setWinner(w);
      setGameOver(true);
    } else if (board.every((cell) => cell !== null)) {
      setGameOver(true);
    }
  }, [board]);

  const calculateWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    // AI move
    if (!isXNext) {
      setTimeout(() => {
        const emptySquares = newBoard
          .map((val, idx) => (val === null ? idx : null))
          .filter((val) => val !== null) as number[];

        if (emptySquares.length > 0) {
          const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          newBoard[randomIndex] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 500);
    } else {
      setIsXNext(false);
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-sm font-bold">
        {winner ? `Winner: ${winner}` : gameOver ? 'Draw!' : `Current: ${isXNext ? 'X' : 'O'}`}
      </div>

      <div className="grid grid-cols-3 gap-2 [background-color:#DFDFDF] p-2 border-2 border-gray-400">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="xp-button w-16 h-16 text-2xl font-bold"
          >
            {cell}
          </button>
        ))}
      </div>

      <button onClick={handleReset} className="xp-button">
        New Game
      </button>

      <div className="text-xs text-center">
        <p>You are X, Computer is O</p>
        <p>Click a square to make your move</p>
      </div>
    </div>
  );
};
