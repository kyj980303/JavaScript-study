const express = require("express");
const path = require("path");

// 1. express 서버에서 정적 파일 제공
const app = express();

// 1-1. express의 기본 미들웨어 함수를 사용한다.
// ==> 이미지, CSS 파일, JavaScript 파일과 같은 정적 파일을 읽어오기 위함
// '/static'으로 시작되는 경로로 접속 시 frondend/static이 기본 고정 경로가 된다.
// __dirname을 빼도 되지만 포함하는 게 정석이다.
app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

// 1-2. get요청이 오면 frontend/index.html 파일을 읽고 내용을 클라이언트에게 전송한다.
// SPA는 Single page이기 때문에 모든 경로에서 index.html을 불러온다.
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

// 2. app.listen 포트 번호를 지정하고 서버를 실행한다.
// node server.js
app.listen(process.env.PORT || 3333, () => {
  console.log("Server running...");
});
