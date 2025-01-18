// src/components/MyList.tsx

import React from 'react';
import { Item } from './MyContainer';

type MyListProps = {
  header: string;
  items: Item[];
  onDelete: (id: string) => void;
  updateList: (id: string) => void;
};

const MyList: React.FC<MyListProps> = ({ header, items, onDelete, updateList }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mt-4">{header}</h3>
      {items.length === 0 ? (
        <p className="text-gray-500">No items to display.</p>
      ) : (
        <ul className="mt-2">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between p-2 border-b">
              <span
                style={{ textDecoration: item.clicked ? 'line-through' : 'none', cursor: 'pointer' }}
                onClick={() => updateList(item.id)}
                data-testid={`item-text-${item.id}`}
              >
                {item.text}
              </span>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-500 hover:text-red-700"
                aria-label={`Delete ${item.text}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyList;
