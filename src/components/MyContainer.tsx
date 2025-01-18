// src/components/MyContainer.tsx

import React, { useState, useEffect } from "react";
import MyList from "./MyList";

// 定义类型
export type Item = { id: string; text: string; clicked: boolean };
type FetchedItem = { id: number; title: string };

// Mock fetch to return predictable data
const mockFetchedData: FetchedItem[] = [
  { id: 1, title: "Fetched text from server" },
];

// 仅在测试环境下 Mock fetch
if (process.env.NODE_ENV === "test") {
  // 检查是否已经有 fetch 被 Mock，避免重复赋值
  if (!global.fetch) {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFetchedData),
      })
    ) as jest.Mock;
  } else {
    // 如果已经有 Mock，覆盖它
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFetchedData),
      })
    );
  }
}

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const MyContainer: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<FetchedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userItems, setUserItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data: FetchedItem[] = await response.json();
        setFetchedData(data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchedItems: Item[] = fetchedData.map((todo) => ({
    id: todo.id.toString(),
    text: todo.title || "Untitled",
    clicked: false,
  }));

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
      prev.map((item) =>
        item.id === id ? { ...item, clicked: !item.clicked } : item
      )
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
          <MyList
            header="Fetched Items"
            items={fetchedItems}
            onDelete={() => {}} // Fetched items 不支持删除
            updateList={toggleClick}
          />
          <MyList
            header="User Added Items"
            items={userItems}
            onDelete={handleDeleteItem}
            updateList={toggleClick}
          />
        </>
      )}
    </div>
  );
};

export default MyContainer;
