import React, { useRef, useState, useEffect } from 'react';
import { useOS, Window } from '@/contexts/OSContext';
import { X, Minus, Square } from 'lucide-react';
import { useSoundEffect } from '@/hooks/useSoundEffect';

interface DraggableWindowProps {
  window: Window;
  children: React.ReactNode;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = ({
  window,
  children,
}) => {
  const { moveWindow, focusWindow, minimizeWindow, maximizeWindow, closeWindow } = useOS();
  const { playSound } = useSoundEffect();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [animationClass, setAnimationClass] = useState('animate-window-slide-in');
  const windowRef = useRef<HTMLDivElement>(null);
  const [prevMinimized, setPrevMinimized] = useState(window.minimized);
  const [prevMaximized, setPrevMaximized] = useState(window.maximized);

  // Handle animation state changes
  useEffect(() => {
    if (prevMinimized !== window.minimized) {
      if (window.minimized) {
        // Starting minimize animation
        setAnimationClass('animate-minimize');
      } else {
        // Starting restore animation
        setAnimationClass('animate-restore');
      }
      setPrevMinimized(window.minimized);
    }
  }, [window.minimized, prevMinimized]);

  // Handle maximize animation
  useEffect(() => {
    if (prevMaximized !== window.maximized) {
      if (window.maximized) {
        setAnimationClass('animate-maximize');
      } else {
        setAnimationClass('animate-unmaximize');
      }
      setPrevMaximized(window.maximized);
    }
  }, [window.maximized, prevMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.xp-window-control')) {
      return;
    }
    setIsDragging(true);
    focusWindow(window.id);
    setDragOffset({
      x: e.clientX - window.x,
      y: e.clientY - window.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    moveWindow(window.id, newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Determine if window should be visible
  const isVisible = !window.minimized;

  return (
    <div
      ref={windowRef}
      className={`xp-window fixed ${animationClass}`}
      style={{
        left: `${window.x}px`,
        top: `${window.y}px`,
        width: `${window.width}px`,
        height: `${window.height}px`,
        zIndex: window.zIndex,
        display: isVisible ? 'flex' : 'none',
        flexDirection: 'column',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transformOrigin: 'bottom left',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Title Bar */}
      <div
        className="xp-titlebar cursor-move flex-shrink-0"
        onMouseDown={handleMouseDown}
        onDoubleClick={() => {
          playSound('maximize');
          maximizeWindow(window.id);
        }}
      >
        <span className="flex-1">{window.title}</span>
        <div className="flex gap-1">
          <button
            onClick={() => {
              playSound('minimize');
              minimizeWindow(window.id);
            }}
            className="xp-window-control"
            title="Minimize"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={() => {
              playSound('maximize');
              maximizeWindow(window.id);
            }}
            className="xp-window-control"
            title="Maximize"
          >
            <Square size={14} />
          </button>
          <button
            onClick={() => {
              playSound('close');
              closeWindow(window.id);
            }}
            className="xp-window-control"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto [background-color:#DFDFDF]">
        {children}
      </div>
    </div>
  );
};
