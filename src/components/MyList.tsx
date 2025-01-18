import React from "react";

type Item = { id: string; text: string; clicked: boolean };

interface MyListProps {
  items: Item[];
  onDelete?: (id: string) => void;  // ✅ 让 onDelete 变成可选
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
          style={{ textDecoration: item.clicked ? "line-through" : "none" }}
          onClick={() => updateList(item.id)}
        >
          {item.text}
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete?.(item.id);  // ✅ 使用 ?. 避免 undefined 报错
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
