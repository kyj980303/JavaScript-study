const express = require("express");
const path = require("path");

// 1. express 서버에서 정적 파일 제공
const app = express();

// 1-1. express의 기본 미들웨어 함수를 사용한다.
app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

// 1-2. get요청이 오면 frontend/index.html 파일을 읽고 내용을 클라이언트에게 전송한다.
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

// 2. app.listen 포트 번호를 지정하고 서버를 실행한다.
// node server.js
app.listen(process.env.PORT || 3300, () => {
  console.log("Server running...");
});
