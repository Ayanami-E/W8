import React, { useState, useEffect } from "react";
import MyList from "./MyList";
import useFetch from "../hooks/useFetch";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export type Item = { id: string; text: string; clicked: boolean };
type FetchedItem = { id: number; title: string };

const MyContainer: React.FC = () => {
  const { data: fetchedData, loading, error } = useFetch<FetchedItem[]>(API_URL);
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (Array.isArray(fetchedData) && fetchedData.length > 0) {
      setItems(
        fetchedData.map((item) => ({
          id: item.id.toString(),
          text: item.title || "Untitled",
          clicked: false,
        }))
      );
    } else {
      // ✅ 确保 `items` 至少有一个默认数据
      setItems([{ id: "1", text: "Default Item", clicked: false }]);
    }
  }, [fetchedData]);

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
          <MyList header="Fetched Items" items={items} onDelete={() => {}} updateList={toggleClick} />
          <MyList header="User Added Items" items={userItems} onDelete={handleDeleteItem} updateList={toggleClick} />
        </>
      )}
    </div>
  );
};

export default MyContainer;
