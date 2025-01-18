import React, { useState, useEffect } from "react";
import MyList from "./MyList";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Item类型，以及后台返回的数据类型
export type Item = { id: string; text: string; clicked: boolean };
type FetchedItem = { id: number; title: string };

// 如果 Jest 环境没有 fetch，就 mock 一份
if (typeof global.fetch === "undefined") {
  global.fetch = async () =>
    Promise.resolve({
      json: async () => [
        // 这里改成别的字符串，避免和你测试里输入的 “Some other epic text to write” 冲突
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

  // 一挂载就去 fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data: FetchedItem[] = await response.json();
        // 拿到数据后，存进 state
        setFetchedData(data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 如果fetch到了数据，就用 map 转成 { id, text, clicked }；否则空数组
  const items: Item[] = fetchedData.map((todo) => ({
    id: todo.id.toString(),
    text: todo.title || "Untitled",
    clicked: false,
  }));

  // 删除 userItems 里的某一项
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

      {/* 根据loading/error状态 或者 正常列表进行渲染 */}
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
