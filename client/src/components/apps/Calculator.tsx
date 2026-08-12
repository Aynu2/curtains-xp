import React, { useState } from 'react';
import { useSoundEffect } from '@/hooks/useSoundEffect';

export const Calculator: React.FC = () => {
  const { playSound } = useSoundEffect();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      case '=':
        return current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setWaitingForNewValue(false);
    }
  };

  const buttons = [
    ['MC', 'MR', 'MS', 'M+', 'M-'],
    ['7', '8', '9', '/', 'sqrt'],
    ['4', '5', '6', '*', '%'],
    ['1', '2', '3', '-', '1/x'],
    ['0', '.', '=', '+', 'Back'],
    ['C', 'CE', '±', 'Enter', ''],
  ];

  return (
    <div className="flex flex-col h-full [background-color:#DFDFDF] p-2">
      {/* Display */}
      <div className="mb-2">
        <div className="xp-input text-right text-lg font-mono p-2 mb-1">
          {display}
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="flex-1 grid grid-cols-5 gap-1">
        {buttons.map((row, rowIdx) =>
          row.map((btn, btnIdx) => (
            <button
              key={`${rowIdx}-${btnIdx}`}
              onClick={() => {
                playSound('click');
                if (btn === 'C') handleClear();
                else if (btn === '=') handleEquals();
                else if (btn === '.') handleDecimal();
                else if (['+', '-', '*', '/', '%'].includes(btn)) handleOperation(btn);
                else if (/^\d$/.test(btn)) handleNumber(btn);
              }}
              className={`xp-button text-xs font-bold ${
                ['=', '+', '-', '*', '/'].includes(btn)
                  ? 'bg-gradient-to-b from-blue-400 to-blue-600'
                  : btn === 'C'
                    ? 'bg-gradient-to-b from-red-400 to-red-600'
                    : ''
              }`}
            >
              {btn}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
