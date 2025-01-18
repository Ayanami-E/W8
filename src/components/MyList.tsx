import React from "react";
import { Item } from "./MyContainer";

interface MyListProps {
  header?: string;
  items: Item[];
  onDelete?: (id: string) => void;
  updateList: (id: string) => void;
}

const MyList: React.FC<MyListProps> = ({ header, items, onDelete, updateList }) => {
  return (
    <div>
      {header && <h3 className="text-lg font-semibold text-gray-700">{header}</h3>}

      <ul className="list-disc pl-5">
        {items.length === 0 ? (
          <li role="listitem" className="text-gray-500">
            No items available
          </li>
        ) : (
          items.map((item) => (
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
                  e.stopPropagation(); // 防止触发父级的点击事件
                  onDelete?.(item.id);
                }}
                className="text-red-500 hover:text-red-700"
                role="button"
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MyList;
