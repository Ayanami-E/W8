import React from "react";

type Item = { id: string; text: string };

interface MyListProps {
  items: Item[];
  onDelete: (id: string) => void;
}

const MyList: React.FC<MyListProps> = ({ items, onDelete }) => {
  return (
    <ul className="list-disc pl-5">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex justify-between p-2 border rounded-lg"
          role="listitem"
        >
          {item.text}
          <button
            onClick={() => onDelete(item.id)}
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
