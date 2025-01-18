// src/components/MyList.tsx
import { Item } from './MyContainer';

interface MyListProps {
  header?: string;
  items: Item[];
  updateList?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
}

function MyList({ 
  header, 
  items, 
  updateList = () => {}, 
  onDelete = () => {}, 
  onToggle = () => {} 
}: MyListProps) {
  return (
    <div>
      {header && <h3 className="text-xl font-semibold mt-4">{header}</h3>}
      {items.length === 0 ? (
        <p className="text-gray-500">No items to display.</p>
      ) : (
        <ul className="mt-2">
          {items.map(item => (
            <li
              key={item.id}
              role="listitem"
              onClick={() => {
                updateList(item.id);
                onToggle(item.id);
              }}
              style={{ textDecoration: item.clicked ? 'line-through' : '' }}
              className="flex items-center justify-between p-2 border-b"
            >
              <span>{item.text}</span>
              {onDelete && (
  <span  
    onClick={(e) => {
      e.stopPropagation();
      onDelete(item.id);
    }}
    className="text-red-500 hover:text-red-700 cursor-pointer"  // 添加 cursor-pointer
  >
    Delete
  </span>
)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyList;
