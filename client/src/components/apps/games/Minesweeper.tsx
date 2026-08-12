import React, { useState, useEffect } from 'react';

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

export const Minesweeper: React.FC = () => {
  const ROWS = 8;
  const COLS = 8;
  const MINES = 10;

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [flagCount, setFlagCount] = useState(MINES);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newGrid: Cell[][] = Array(ROWS)
      .fill(null)
      .map(() =>
        Array(COLS)
          .fill(null)
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
          }))
      );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const row = Math.floor(Math.random() * ROWS);
      const col = Math.floor(Math.random() * COLS);
      if (!newGrid[row][col].isMine) {
        newGrid[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate adjacent mines
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].adjacentMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setWon(false);
    setFlagCount(MINES);
  };

  const revealCell = (row: number, col: number) => {
    if (gameOver || won || grid[row][col].isRevealed || grid[row][col].isFlagged) return;

    const newGrid = grid.map((r) => [...r]);

    if (newGrid[row][col].isMine) {
      setGameOver(true);
      // Reveal all mines
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (newGrid[r][c].isMine) {
            newGrid[r][c].isRevealed = true;
          }
        }
      }
      setGrid(newGrid);
      return;
    }

    const flood = (r: number, c: number) => {
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS || newGrid[r][c].isRevealed) return;
      newGrid[r][c].isRevealed = true;
      if (newGrid[r][c].adjacentMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            flood(r + dr, c + dc);
          }
        }
      }
    };

    flood(row, col);
    setGrid(newGrid);

    // Check win condition
    let revealed = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (newGrid[r][c].isRevealed && !newGrid[r][c].isMine) {
          revealed++;
        }
      }
    }
    if (revealed === ROWS * COLS - MINES) {
      setWon(true);
    }
  };

  const toggleFlag = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (gameOver || won || grid[row][col].isRevealed) return;

    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
    setGrid(newGrid);
    setFlagCount(newGrid[row][col].isFlagged ? flagCount - 1 : flagCount + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-4 text-xs font-bold">
        <div>Flags: {flagCount}</div>
        <div>Mines: {MINES}</div>
      </div>

      <div className="[background-color:#DFDFDF] border-2 border-gray-400 p-2">
        <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => revealCell(r, c)}
                onContextMenu={(e) => toggleFlag(r, c, e)}
                className={`w-6 h-6 text-xs font-bold flex items-center justify-center border-2 ${
                  cell.isRevealed
                    ? cell.isMine
                      ? 'bg-red-500 border-red-600'
                      : 'bg-gray-300 border-gray-400'
                    : 'xp-button'
                }`}
              >
                {cell.isRevealed ? (
                  cell.isMine ? (
                    '💣'
                  ) : cell.adjacentMines > 0 ? (
                    cell.adjacentMines
                  ) : (
                    ''
                  )
                ) : cell.isFlagged ? (
                  '🚩'
                ) : (
                  ''
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {(gameOver || won) && (
        <div className="text-center">
          <div className={`text-sm font-bold mb-2 ${won ? 'text-green-600' : 'text-red-600'}`}>
            {won ? 'You Won!' : 'Game Over!'}
          </div>
          <button onClick={initializeGame} className="xp-button">
            New Game
          </button>
        </div>
      )}
    </div>
  );
};
