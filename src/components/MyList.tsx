// src/components/MyList.tsx

import React from "react";
import { TItem } from "../types";

interface MyListProps {
  header: string;
  items: TItem[];
  updateList: (id: string) => void;
  onDelete?: (id: string) => void; // 可选的删除函数
}

const MyList: React.FC<MyListProps> = ({ header, items, updateList, onDelete }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{header}</h3>
      <ul className="list-disc pl-5">
        {items.length === 0 ? (
          <li role="listitem" className="text-gray-500">
            No items available
          </li>
        ) : (
          items.map((item) => (
            <li
              key={item.id}
              role="listitem"
              className="flex justify-between p-2 border rounded-lg cursor-pointer"
              style={{ textDecoration: item.clicked ? "line-through" : "none" }}
              onClick={() => updateList(item.id)}
            >
              {item.text}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 防止触发父级的点击事件
                    onDelete(item.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                  role="button"
                >
                  ❌
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MyList;
