import React, { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

export const Snake: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState<Position>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<number | null>(null);

  const GRID_WIDTH = 20;
  const GRID_HEIGHT = 20;
  const CELL_SIZE = 20;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    gameLoopRef.current = window.setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: (head.x + nextDirection.x + GRID_WIDTH) % GRID_WIDTH,
          y: (head.y + nextDirection.y + GRID_HEIGHT) % GRID_HEIGHT,
        };

        // Check collision with self
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        let newSnake = [newHead, ...prevSnake];

        // Check if food is eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood({
            x: Math.floor(Math.random() * GRID_WIDTH),
            y: Math.floor(Math.random() * GRID_HEIGHT),
          });
        } else {
          newSnake.pop();
        }

        setDirection(nextDirection);
        return newSnake;
      });
    }, 150);

    return () => {
      if (gameLoopRef.current !== null) window.clearInterval(gameLoopRef.current);
    };
  }, [gameOver, nextDirection, food]);

  const handleReset = () => {
    if (gameLoopRef.current !== null) window.clearInterval(gameLoopRef.current);
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-sm font-bold">Score: {score}</div>

      <div
        className="bg-black border-4 border-gray-800"
        style={{
          width: GRID_WIDTH * CELL_SIZE,
          height: GRID_HEIGHT * CELL_SIZE,
          position: 'relative',
        }}
      >
        {/* Snake */}
        {snake.map((segment, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: idx === 0 ? '#00FF00' : '#00AA00',
              border: '1px solid #006600',
            }}
          />
        ))}

        {/* Food */}
        <div
          style={{
            position: 'absolute',
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: '#FF0000',
            border: '1px solid #AA0000',
          }}
        />
      </div>

      {gameOver && (
        <div className="text-center">
          <div className="text-sm font-bold text-red-600 mb-2">Game Over!</div>
          <div className="text-xs mb-4">Final Score: {score}</div>
          <button onClick={handleReset} className="xp-button">
            Play Again
          </button>
        </div>
      )}

      <div className="text-xs text-center">
        <p>Use arrow keys to move</p>
        <p>Eat the red squares to grow</p>
      </div>
    </div>
  );
};
