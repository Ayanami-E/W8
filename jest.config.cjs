module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testResultsProcessor: "jest-junit", // 让 Jest 生成 junit.xml
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy" // 让 Jest 忽略 CSS
  }
};
