// src/components/MyList.tsx
interface MyListProps {
  header?: string;
  items: Item[];
  updateList?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;  // 使所有props都是可选的
}

function MyList({ header, items, updateList = () => {}, onToggle = () => {} }: MyListProps) {
  return (
    <div>
      {header && <h3>{header}</h3>}
      <ul className="mt-4">
        {items.map((item) => (
          <li
            key={item.id}
            role="listitem"
            onClick={() => {
              updateList(item.id);
              onToggle(item.id);
            }}
            style={{ textDecoration: item.completed ? 'line-through' : '' }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyList;
