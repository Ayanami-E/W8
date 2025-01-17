import React from "react";
import MyContainer from "./components/MyContainer";
import "./App.css"; // 确保 App.css 存在并包含一些基础样式

function App() {
  return (
    <div className="app-container">
      <h1>Hello World!</h1>
      <MyContainer />
    </div>
  );
}


export default App;
