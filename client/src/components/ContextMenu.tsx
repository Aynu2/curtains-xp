import React, { useState, useEffect } from 'react';
import { Copy, Trash2, Edit, Download } from 'lucide-react';
import { useSoundEffect } from '@/hooks/useSoundEffect';

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  divider?: boolean;
  disabled?: boolean;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const { playSound } = useSoundEffect();
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const handleClick = () => onClose();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [onClose]);

  return (
    <div
      className="fixed z-50 bg-white border-2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        borderColor: '#DFDFDF #808080 #808080 #DFDFDF',
        minWidth: '150px',
        boxShadow: '1px 1px 0 rgba(0,0,0,0.3)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, idx) => (
        <div key={idx}>
          {item.divider ? (
            <div className="h-px bg-gray-300 my-1" />
          ) : (
            <button
              onClick={() => {
                playSound('click');
                item.onClick();
                onClose();
              }}
              disabled={item.disabled}
              className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-blue-500 hover:text-white transition ${
                item.disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    items: ContextMenuItem[];
  } | null>(null);

  const handleContextMenu = (
    e: React.MouseEvent,
    items: ContextMenuItem[]
  ) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return {
    contextMenu,
    handleContextMenu,
    closeContextMenu,
    ContextMenuComponent: contextMenu ? (
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        items={contextMenu.items}
        onClose={closeContextMenu}
      />
    ) : null,
  };
};
