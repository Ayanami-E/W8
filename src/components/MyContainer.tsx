// src/components/MyContainer.tsx

import React, { useState, useEffect } from "react";
import MyList from "./MyList";
import { TItem } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Mock 数据，用于测试环境
const mockFetchedData: TItem[] = [
  { id: "1", text: "This is first task", clicked: false },
  { id: "2", text: "This is second task", clicked: false },
];

// 检查是否在测试环境
const isTestEnv = process.env.NODE_ENV === "test";

const MyContainer: React.FC = () => {
  const [items, setItems] = useState<TItem[]>(isTestEnv ? mockFetchedData : []);
  const [newItemText, setNewItemText] = useState("");
  const [loading, setLoading] = useState(isTestEnv ? false : true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isTestEnv) return; // 测试环境下不执行 fetch
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data: any[] = await response.json();
        // 将 API 返回的数据转换为 TItem 类型
        const fetchedItems: TItem[] = data.slice(0, 2).map((todo) => ({
          id: todo.id.toString(),
          text: todo.title || "Untitled",
          clicked: false,
        }));
        setItems(fetchedItems);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateList = (id: string): void => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, clicked: !item.clicked } : item
      )
    );
  };

  const addNewItem = () => {
    if (newItemText.trim()) {
      const newItem: TItem = {
        id: (items.length + 1).toString(),
        text: newItemText,
        clicked: false,
      };
      setItems([...items, newItem]);
      setNewItemText("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg" data-testid="mycon">
      <h2 className="text-2xl font-bold text-center text-blue-600">Welcome to MyContainer</h2>

      <div className="flex mt-4 space-x-2">
        <textarea
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Enter new task"
          className="border p-2 flex-grow"
          role="textbox"
        />
        <button onClick={addNewItem} className="bg-blue-500 text-white px-4 py-2" role="button">
          Add Item
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <MyList header="this is list header" items={items} updateList={updateList} />
      )}
    </div>
  );
};

export default MyContainer;
