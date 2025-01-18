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
      <h3>{header}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span
              style={{ textDecoration: item.clicked ? 'line-through' : 'none' }}
              onClick={() => updateList(item.id)}
            >
              {item.text}
            </span>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyList;
