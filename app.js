const express = require('express');
const app = express();
const port = 4000;

const blogRouter = require("./routes/blog");

app.use("/api", [blogRouter]);

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

app.listen(port, () => {
	console.log(port, '포트로 서버가 열렸어요!');
});