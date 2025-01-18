interface MyListProps {
  header?: string;  // ✅ 让 header 可选
  items: Item[];
  onDelete?: (id: string) => void;
  updateList: (id: string) => void;
}

const MyList: React.FC<MyListProps> = ({ header, items, onDelete, updateList }) => {
  return (
    <div>
      {header && <h2 className="text-lg font-bold text-gray-800">{header}</h2>}  {/* ✅ 添加 header */}
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
                onDelete?.(item.id);
              }}
              className="text-red-500 hover:text-red-700"
              role="button"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyList;
