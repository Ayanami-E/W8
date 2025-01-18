import React from "react";
import MyContainer from "./components/MyContainer"; // ✅ 确保正确引入

function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
      {/* ✅ 这里添加 data-testid，让 Jest 能找到 MyContainer */}
      <div data-testid="mycon">
        <MyContainer />
      </div>
    </div>
  );
}

export default App;
