import React, { useState } from 'react';

function MyContainer() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
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
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              const newItems = [...items];
              newItems[index] = `${item} (clicked)`;
              setItems(newItems);
            }}
            style={{ cursor: 'pointer' }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyContainer;
