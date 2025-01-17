import React, { useState } from "react";
import MyList from "./MyList";
import useFetch from "../hooks/useFetch";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const MyContainer: React.FC = () => {
  const { data: fetchedData, loading, error } = useFetch(API_URL);
  const [userItems, setUserItems] = useState<{ id: string; text: string }[]>([]);

  // ✅ 确保 fetchedData 转换为符合 MyList 需求的格式
  const items = Array.isArray(fetchedData)
    ? fetchedData.map((text, index) => ({ id: index.toString(), text }))
    : [];

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
