// src/components/MyContainer.tsx
import { useState } from 'react';
import MyList from './MyList';

export interface Item {
 id: string;
 text: string;
 clicked: boolean;
}

function MyContainer() {
 const [inputValue, setInputValue] = useState('');
 const [items, setItems] = useState<Item[]>([
   { id: '1', text: 'Initial item', clicked: false }
 ]);

 const handleAddItem = () => {
   if (inputValue.trim()) {
     setItems([...items, {
       id: Date.now().toString(),
       text: inputValue,
       clicked: false
     }]);
     setInputValue('');
   }
 };

 const handleDeleteItem = (id: string) => {
   setItems(prev => prev.filter(item => item.id !== id));
 };

 const toggleItem = (id: string) => {
   setItems(items.map(item => 
     item.id === id ? { ...item, clicked: !item.clicked } : item
   ));
 };

 return (
   <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg" data-testid="mycon">
     <h2 className="text-2xl font-bold text-center text-blue-600">
       Welcome to MyContainer
     </h2>
     <div className="flex mt-4 space-x-2">
       <input
         type="text"
         value={inputValue}
         onChange={(e) => setInputValue(e.target.value)}
         placeholder="Enter a new item"
         className="border p-2 flex-grow"
         role="textbox"
       />
       <button
  onClick={handleAddItem}
  className="bg-blue-500 text-white px-4 py-2"
  data-testid="add-button"  
  type="button"
  name="add"  
>
  Add Item
</button>
     </div>
     <MyList 
       items={items}
       updateList={toggleItem}
       onDelete={handleDeleteItem}
       onToggle={toggleItem}
     />
   </div>
 );
}

export default MyContainer;
