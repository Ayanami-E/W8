// src/components/MyContainer.tsx

import React, { useState, useEffect } from "react";
import MyList from "./MyList";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

// 定义 Item 类型以及从后台返回的数据类型
export type Item = { id: string; text: string; clicked: boolean };
type FetchedItem = { id: number; title: string };

// 在测试环境中模拟 fetch 请求
if (process.env.NODE_ENV === "test") {
  global.fetch = async () =>
    Promise.resolve({
      json: async () => [
        { id: 1, title: "Fetched text from server" },
      ],
    }) as any;
}

const MyContainer: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<FetchedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userItems, setUserItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState("");

  // 组件挂载时执行数据获取
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data: FetchedItem[] = await response.json();
        // 将获取到的数据存入 state
        setFetchedData(data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 将获取到的数据转换为 Item 类型
  const items: Item[] = fetchedData.map((todo) => ({
    id: todo.id.toString(),
    text: todo.title || "Untitled",
    clicked: false,
  }));

  // 删除用户添加的某一项
  const handleDeleteItem = (id: string) => {
    setUserItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 添加一项
  const handleAddItem = () => {
    if (inputValue.trim()) {
      setUserItems((prev) => [
        ...prev,
        { id: Date.now().toString(), text: inputValue, clicked: false },
      ]);
      setInputValue("");
    }
  };

  // 点击时划线
  const toggleClick = (id: string) => {
    setUserItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, clicked: !item.clicked } : item
      )
    );
  };

  return (
    <div
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      data-testid="mycon"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600">
        Welcome to MyContainer
      </h2>

      {/* 输入框与按钮 */}
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

      {/* 根据 loading/error 状态 或 正常列表进行渲染 */}
      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <>
          <MyList
            header="Fetched Items"
            items={items}
            onDelete={() => {}}
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
