// src/components/MyContainer.tsx
import { useState } from 'react';

// 导出 Item 类型
export interface Item {
  id: string;
  text: string;
  completed: boolean;
}

function MyContainer() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<Item[]>([
    // 初始化一个列表项
    { id: '1', text: 'Initial item', completed: false }
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems([...items, {
        id: Date.now().toString(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg" data-testid="mycon">
      <h2 className="text-2xl font-bold text-center text-blue-600">
        Welcome to MyContainer
      </h2>
      <div className="flex mt-4 space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new item"
          className="border p-2 flex-grow"
          role="textbox"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2"
          role="button"
        >
          Add Item
        </button>
      </div>
      <ul className="mt-4">
        {items.map((item) => (
          <li
            key={item.id}
            role="listitem"
            onClick={() => toggleItem(item.id)}
            style={{ 
              textDecoration: item.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyContainer;
