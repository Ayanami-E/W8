import React from "react";

interface MyListProps {
  items: string[];
  onDelete: (item: string) => void;
}

const MyList: React.FC<MyListProps> = ({ items, onDelete }) => {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
        >
          <span className="text-gray-800">{item}</span>
          <button
            onClick={() => onDelete(item)}
            className="text-red-500 hover:text-red-700 transition"
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MyList;
