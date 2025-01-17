import React, { useState } from "react";
import MyList from "./MyList";
import useFetch from "../hooks/useFetch";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const MyContainer: React.FC = () => {
  const { data: items, loading, error } = useFetch(API_URL);
  const [newItem, setNewItem] = useState("");
  const [userItems, setUserItems] = useState<{ id: string; text: string }[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setUserItems([...userItems, { id: Date.now().toString(), text: newItem }]);
      setNewItem("");
    }
  };

  const handleDeleteItem = (id: string) => {
    setUserItems(userItems.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600">Welcome to MyContainer</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <>
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Enter a new item"
              value={newItem}
              onChange={handleInputChange}
              className="flex-1 p-2 border rounded-lg"
              role="textbox"
            />
            <button
              onClick={handleAddItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              role="button"
            >
              Add Item
            </button>
          </div>

          <h3 className="text-lg font-semibold mt-4 text-gray-700">Fetched Items</h3>
          <MyList items={items} onDelete={() => {}} />

          <h3 className="text-lg font-semibold mt-4 text-gray-700">User Added Items</h3>
          <MyList items={userItems} onDelete={handleDeleteItem} />
        </>
      )}
    </div>
  );
};

export default MyContainer;
