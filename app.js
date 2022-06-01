const express = require('express');
const connect = require("./schemas");
const app = express();
const port = 4000;

connect();

const blogRouter = require("./routes/blog");
const userRouter = require("./routes/users");

app.use(express.json());

app.use("/api", [blogRouter, userRouter]);

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

app.listen(port, () => {
	console.log(port, '포트로 서버가 열렸어요!');
});