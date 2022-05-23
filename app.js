const express = require('express');
const app = express();
const port = 4000;

// root 주소의 페이지에서 'Hello World!' 출력
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(port, '포트로 서버가 열렸어요!');
});