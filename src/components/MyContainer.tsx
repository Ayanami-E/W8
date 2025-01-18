// src/components/MyContainer.tsx
import { useState } from 'react';
import MyList from './MyList';

// 导出 Item 接口供其他组件使用
export interface Item {
 id: string;
 text: string;
 clicked: boolean;
}

function MyContainer() {
 // 输入框状态
 const [inputValue, setInputValue] = useState('');
 // 待办项列表状态
 const [items, setItems] = useState<Item[]>([
   { id: '1', text: 'Initial item', clicked: false }
 ]);

 // 处理添加项目
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

 // 处理删除项目
 const handleDeleteItem = (id: string) => {
   setItems(prev => prev.filter(item => item.id !== id));
 };

 // 处理项目状态切换
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
  data-testid="add-button"  // 保留这个
  type="button"
  name="add"  // 添加这个
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
