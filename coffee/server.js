const express = require("express");
const path = require("path");

// 1. express 서버에서 정적 파일 제공
const app = express();

// 1-1. express의 기본 미들웨어 함수를 사용한다.
// ==> express.static : 이미지, CSS 파일, JavaScript 파일과 같은 정적 파일을 읽어오기 위함
// __dirname는 현재 파일 경로를 말한다.
app.use(express.static(__dirname));

// 1-2. get요청이 오면 index.html 파일을 읽고 내용을 클라이언트에게 전송한다.
// SPA는 Single page이기 때문에 모든 경로에서 index.html을 불러온다.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 2. app.listen 포트 번호를 지정하고 서버를 실행한다.
// node server.js
app.listen(process.env.PORT || 3200, () => {
  console.log("Server running...");
});
