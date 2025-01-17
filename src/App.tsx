import React from "react";
import MyContainer from "./components/MyContainer";
import "./App.css"; // 确保 App.css 存在并包含一些基础样式

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header>
        <h1>Welcome to My React App</h1>
      </header>
      <main>
        <MyContainer />
      </main>
      <footer>
        <p>© 2025 My React App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
