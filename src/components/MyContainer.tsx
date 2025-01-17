import React, { useState } from "react";
import MyList from "./MyList";
import useFetch from "../hooks/useFetch";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

type Item = { id: string; text: string };

const MyContainer: React.FC = () => {
  const { data: fetchedData, loading, error } = useFetch(API_URL);
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState("");

  // ✅ 确保 fetchedData 转换为符合 MyList 需求的格式
  const items: Item[] = Array.isArray(fetchedData)
    ? fetchedData.map((item) => ({
        id: item.id.toString(), // 确保 `id` 是字符串
        text: item.title || "Untitled", // 避免 undefined
      }))
    : [];

  const handleDeleteItem = (id: string) => {
    setUserItems(userItems.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setUserItems([...userItems, { id: Date.now().toString(), text: inputValue }]);
      setInputValue("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600">Welcome to MyContainer</h2>

      {/* ✅ 添加输入框和按钮，确保 Task 4 能找到 input */}
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
          {/* ✅ 确保 items 传递的是对象数组 */}
          <MyList items={items} onDelete={() => {}} />

          <h3 className="text-lg font-semibold mt-4 text-gray-700">User Added Items</h3>
          <MyList items={userItems} onDelete={handleDeleteItem} />
        </>
      )}
    </div>
  );
};

export default MyContainer;
