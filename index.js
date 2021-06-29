const express = require("express");
const redis = require("redis");
const app = express();

// redis client 설정
const client = redis.createClient({
  host: "redis-service",
  ports: 6379,
});

const port = 8080;

// 서버 구동시 증가될 숫자는 0으로 초기화 (redisDB에 저장)
// redis는 key-value 쌍으로 데이터를 저장
// key=num, value=0
client.set("num", 0);

app.get("/", (req, res) => {
  client.get("num", (err, number) => {
    // redis로부터 key값을 num으로 하는 값을 get
    res.send("Test Incresed number from redis : " + number); // redis로 부터 get한 값을 그대로 브라우저에 응답
    client.set("num", parseInt(number) + 1); // num을 key값으로 하는 value에 +1 만큼 증가시켜서 set(저장)
  });
});

app.listen(port);
console.log(`running on ${port}`);
