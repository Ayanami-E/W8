import { Item } from './MyContainer';

interface MyListProps {
  items: Item[];
  onToggle: (id: string) => void;
}

function MyList({ items, onToggle }: MyListProps) {
  return (
    <ul className="mt-4">
      {items.map((item) => (
        <li
          key={item.id}
          role="listitem"
          onClick={() => onToggle(item.id)}
          style={{ 
            textDecoration: item.completed ? 'line-through' : 'none',
            cursor: 'pointer'
          }}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
}

export default MyList;
