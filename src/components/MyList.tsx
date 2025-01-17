import React from "react";

type Item = { id: string; text: string; clicked: boolean };

interface MyListProps {
  items: Item[];
  onDelete: (id: string) => void;
  updateList: (id: string) => void;
}

const MyList: React.FC<MyListProps> = ({ items, onDelete, updateList }) => {
  return (
    <ul className="list-disc pl-5">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex justify-between p-2 border rounded-lg cursor-pointer"
          role="listitem"
          style={{ textDecoration: item.clicked ? "line-through" : "none" }} // ✅ Task 5: 点击后加删除线
          onClick={() => updateList(item.id)}
        >
          {item.text}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 防止同时触发 `li` 点击事件
              onDelete(item.id);
            }}
            className="text-red-500 hover:text-red-700"
            role="button"
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MyList;
