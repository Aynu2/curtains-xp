import React, { useState } from 'react';

type CellData = Record<string, Record<string, string>>;

export const SpreadsheetPro: React.FC = () => {
  const [data, setData] = useState<CellData>({
    A: { 1: 'Product', 2: 'Laptop', 3: 'Mouse', 4: 'Keyboard' },
    B: { 1: 'Price', 2: '$999', 3: '$25', 4: '$75' },
    C: { 1: 'Quantity', 2: '5', 3: '20', 4: '10' },
    D: { 1: 'Total', 2: '$4995', 3: '$500', 4: '$750' },
  });

  const [selectedCell, setSelectedCell] = useState<{ col: string; row: number } | null>(null);

  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
  const rows = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleCellChange = (col: string, row: number, value: string) => {
    setData({
      ...data,
      [col]: {
        ...data[col],
        [row]: value,
      },
    });
  };

  const getCellValue = (col: string, row: number): string => {
    return data[col]?.[row] || '';
  };

  return (
    <div className="flex flex-col h-full [background-color:#DFDFDF]">
      {/* Toolbar */}
      <div className="bg-[background-color:#C0C0C0] border-b-2 border-gray-400 p-2 flex gap-2">
        <button className="xp-button text-xs">📁 Open</button>
        <button className="xp-button text-xs">💾 Save</button>
        <button className="xp-button text-xs">➕ Insert</button>
        <button className="xp-button text-xs">🗑️ Delete</button>
      </div>

      {/* Spreadsheet */}
      <div className="flex-1 overflow-auto p-2">
        <table className="border-collapse border-2 border-gray-400">
          <thead>
            <tr>
              <th className="w-8 h-6 bg-[background-color:#C0C0C0] border-2 border-gray-400 text-xs font-bold"></th>
              {columns.map(col => (
                <th
                  key={col}
                  className="w-24 h-6 bg-[background-color:#C0C0C0] border-2 border-gray-400 text-xs font-bold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row}>
                <td className="w-8 h-6 bg-[background-color:#C0C0C0] border-2 border-gray-400 text-xs font-bold text-center">
                  {row}
                </td>
                {columns.map(col => (
                  <td
                    key={`${col}${row}`}
                    className="w-24 h-6 border-2 border-gray-400"
                  >
                    <input
                      type="text"
                      value={getCellValue(col, row)}
                      onChange={(e) => handleCellChange(col, row, e.target.value)}
                      onFocus={() => setSelectedCell({ col, row })}
                      onBlur={() => setSelectedCell(null)}
                      className={`w-full h-full text-xs px-1 border-none outline-none ${
                        selectedCell?.col === col && selectedCell?.row === row
                          ? 'bg-yellow-100'
                          : 'bg-white'
                      }`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
