import React, { useState } from "react";
import MyList from "./MyList";
import useFetch from "../hooks/useFetch";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

type Item = { id: string; text: string; clicked: boolean };
type FetchedItem = { id: number; title: string };

const MyContainer: React.FC = () => {
  const { data: fetchedData, loading, error } = useFetch<FetchedItem[]>(API_URL);
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState("");

  const items: Item[] = Array.isArray(fetchedData)
    ? fetchedData.map((item) => ({
        id: item.id.toString(),
        text: item.title || "Untitled",
        clicked: false,
      }))
    : [];

  const handleDeleteItem = (id: string) => {
    setUserItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setUserItems((prev) => [
        ...prev,
        { id: Date.now().toString(), text: inputValue, clicked: false },
      ]);
      setInputValue("");
    }
  };

  const toggleClick = (id: string) => {
    setUserItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, clicked: !item.clicked } : item))
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg" data-testid="mycon">
      <h2 className="text-2xl font-bold text-center text-blue-600">Welcome to MyContainer</h2>

      <div className="flex mt-4 space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new item"
          className="border p-2 flex-grow"
          role="textbox"
        />
        <button onClick={handleAddItem} className="bg-blue-500 text-white px-4 py-2" role="button">
          Add Item
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <>
          <h3 className="text-lg font-semibold mt-4 text-gray-700">Fetched Items</h3>
          <MyList items={items} onDelete={() => {}} updateList={toggleClick} />

          <h3 className="text-lg font-semibold mt-4 text-gray-700">User Added Items</h3>
          <MyList items={userItems} onDelete={handleDeleteItem} updateList={toggleClick} />
        </>
      )}
    </div>
  );
};

export default MyContainer;
