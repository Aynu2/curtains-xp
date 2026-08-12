import React, { useState } from 'react';
import { Snake } from './games/Snake';
import { Minesweeper } from './games/Minesweeper';
import { TicTacToe } from './games/TicTacToe';
import { useSoundEffect } from '@/hooks/useSoundEffect';

export const GamesApp: React.FC = () => {
  const { playSound } = useSoundEffect();
  const [selectedGame, setSelectedGame] = useState<'menu' | 'snake' | 'minesweeper' | 'tictactoe'>('menu');

  if (selectedGame === 'snake') {
    return (
      <div className="flex flex-col h-full [background-color:#DFDFDF]">
        <button
          onClick={() => {
            playSound('click');
            setSelectedGame('menu');
          }}
          className="xp-button m-2"
        >
          ← Back to Menu
        </button>
        <div className="flex-1 flex items-center justify-center">
          <Snake />
        </div>
      </div>
    );
  }

  if (selectedGame === 'minesweeper') {
    return (
      <div className="flex flex-col h-full [background-color:#DFDFDF]">
        <button
          onClick={() => {
            playSound('click');
            setSelectedGame('menu');
          }}
          className="xp-button m-2"
        >
          ← Back to Menu
        </button>
        <div className="flex-1 flex items-center justify-center">
          <Minesweeper />
        </div>
      </div>
    );
  }

  if (selectedGame === 'tictactoe') {
    return (
      <div className="flex flex-col h-full [background-color:#DFDFDF]">
        <button
          onClick={() => {
            playSound('click');
            setSelectedGame('menu');
          }}
          className="xp-button m-2"
        >
          ← Back to Menu
        </button>
        <div className="flex-1 flex items-center justify-center">
          <TicTacToe />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full [background-color:#DFDFDF] p-4">
      <h2 className="text-sm font-bold mb-6">Built-in Games</h2>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => {
            playSound('click');
            setSelectedGame('snake');
          }}
          className="xp-button p-4 h-auto flex flex-col items-center gap-2 hover:bg-blue-500 hover:text-white"
        >
          <span className="text-3xl">🐍</span>
          <span className="font-bold">Snake</span>
          <span className="text-xs">Classic snake game</span>
        </button>

        <button
          onClick={() => {
            playSound('click');
            setSelectedGame('minesweeper');
          }}
          className="xp-button p-4 h-auto flex flex-col items-center gap-2 hover:bg-blue-500 hover:text-white"
        >
          <span className="text-3xl">💣</span>
          <span className="font-bold">Minesweeper</span>
          <span className="text-xs">Find all the mines</span>
        </button>

        <button
          onClick={() => {
            playSound('click');
            setSelectedGame('tictactoe');
          }}
          className="xp-button p-4 h-auto flex flex-col items-center gap-2 hover:bg-blue-500 hover:text-white"
        >
          <span className="text-3xl">⭕</span>
          <span className="font-bold">Tic Tac Toe</span>
          <span className="text-xs">Play against the computer</span>
        </button>
      </div>
    </div>
  );
};
