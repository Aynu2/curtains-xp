import React, { useState } from 'react';
import { Snake } from './games/Snake';
import { Minesweeper } from './games/Minesweeper';
import { TicTacToe } from './games/TicTacToe';
import { useSoundEffect } from '@/hooks/useSoundEffect';

type GameId = 'menu' | 'snake' | 'minesweeper' | 'tictactoe';

const GAMES = [
  {
    id: 'snake' as const,
    label: 'Snake',
    icon: '🐍',
    desc: 'Guide your snake to eat food without hitting yourself.',
    difficulty: 'Easy',
    diffColor: '#2a9d2a',
  },
  {
    id: 'minesweeper' as const,
    label: 'Minesweeper',
    icon: '💣',
    desc: 'Reveal all safe squares without detonating a mine.',
    difficulty: 'Medium',
    diffColor: '#d4a017',
  },
  {
    id: 'tictactoe' as const,
    label: 'Tic Tac Toe',
    icon: '⭕',
    desc: 'Classic three-in-a-row game against the computer.',
    difficulty: 'Easy',
    diffColor: '#2a9d2a',
  },
];

export const GamesApp: React.FC = () => {
  const { playSound } = useSoundEffect();
  const [selectedGame, setSelectedGame] = useState<GameId>('menu');

  const renderGame = () => {
    switch (selectedGame) {
      case 'snake': return <Snake />;
      case 'minesweeper': return <Minesweeper />;
      case 'tictactoe': return <TicTacToe />;
      default: return null;
    }
  };

  if (selectedGame !== 'menu') {
    const game = GAMES.find(g => g.id === selectedGame)!;
    return (
      <div className="flex flex-col h-full" style={{ background: '#ECE9D8' }}>
        {/* Game Title Bar */}
        <div
          className="flex items-center gap-3 px-3 py-2 border-b-2"
          style={{ background: 'linear-gradient(to right, #1f5ac4, #4288e8)', borderColor: '#0a3a8c' }}
        >
          <button
            onClick={() => { playSound('click'); setSelectedGame('menu'); }}
            className="text-white text-xs px-2 py-1 rounded border border-white/30 hover:bg-white/20 transition-colors"
          >
            ◀ Games Menu
          </button>
          <span className="text-white font-bold text-sm">{game.icon} {game.label}</span>
        </div>

        {/* Game content */}
        <div className="flex-1 overflow-auto flex items-start justify-center p-4">
          {renderGame()}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#ECE9D8' }}>
      {/* Header */}
      <div
        className="px-4 py-3 border-b-2"
        style={{ background: 'linear-gradient(to right, #1f5ac4, #4288e8)', borderColor: '#0a3a8c' }}
      >
        <div className="text-white font-bold text-sm">🎮 Windows Games</div>
        <div className="text-blue-200 text-xs">Select a game to play</div>
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - task panel */}
        <div
          className="w-44 flex-shrink-0 p-3 border-r"
          style={{ background: '#dce6f7', borderColor: '#b0c4de' }}
        >
          <div
            className="text-xs font-bold px-2 py-1 mb-2 rounded"
            style={{ background: 'linear-gradient(to right, #1f5ac4, #4288e8)', color: 'white' }}
          >
            Game Tasks
          </div>
          <div className="space-y-1 text-xs">
            {GAMES.map(game => (
              <button
                key={game.id}
                onClick={() => { playSound('click'); setSelectedGame(game.id); }}
                className="w-full text-left px-2 py-1.5 flex items-center gap-2 hover:bg-[#316AC5] hover:text-white rounded transition-colors text-blue-700 hover:text-white"
              >
                <span>{game.icon}</span>
                <span className="font-medium">{game.label}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-blue-300 my-3" />

          <div
            className="text-xs font-bold px-2 py-1 mb-2 rounded"
            style={{ background: 'linear-gradient(to right, #1f5ac4, #4288e8)', color: 'white' }}
          >
            Other Places
          </div>
          <div className="text-xs text-blue-700 space-y-1">
            <div className="px-2 py-1">🖥️ Desktop</div>
            <div className="px-2 py-1">📁 My Documents</div>
          </div>
        </div>

        {/* Main games grid */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 gap-3">
            {GAMES.map((game) => (
              <button
                key={game.id}
                onClick={() => { playSound('click'); setSelectedGame(game.id); }}
                className="flex items-center gap-4 p-4 border-2 text-left transition-all hover:border-[#316AC5] group rounded"
                style={{
                  background: 'white',
                  borderColor: '#d0d0d0',
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#e8f0fb')}
                onMouseOut={e => (e.currentTarget.style.background = 'white')}
              >
                {/* Big icon */}
                <div
                  className="text-5xl w-16 h-16 flex items-center justify-center flex-shrink-0 rounded border-2"
                  style={{ background: '#f0f4ff', borderColor: '#b0c4de' }}
                >
                  {game.icon}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-800 mb-1 group-hover:text-[#316AC5]">{game.label}</div>
                  <div className="text-xs text-gray-600 mb-2">{game.desc}</div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: game.diffColor }}
                  >
                    {game.difficulty}
                  </span>
                </div>

                {/* Play arrow */}
                <div className="text-[#316AC5] text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  ▶
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
