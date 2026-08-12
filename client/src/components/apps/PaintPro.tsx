import React, { useRef, useState } from 'react';
import { Trash2, RotateCcw } from 'lucide-react';

export const PaintPro: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col h-full [background-color:#DFDFDF]">
      {/* Toolbar */}
      <div className="bg-[background-color:#C0C0C0] border-b-2 border-gray-400 p-2 space-y-2">
        <div className="flex gap-2 items-center">
          <label className="text-xs font-bold">Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 cursor-pointer"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-xs font-bold">Brush Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-xs">{brushSize}px</span>
        </div>
        <div className="flex gap-2">
          <button onClick={clearCanvas} className="xp-button text-xs flex items-center gap-1">
            <Trash2 size={12} /> Clear
          </button>
          <button onClick={() => window.location.reload()} className="xp-button text-xs flex items-center gap-1">
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-white p-2 overflow-auto">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="border-2 border-gray-400 bg-white cursor-crosshair"
        />
      </div>
    </div>
  );
};
